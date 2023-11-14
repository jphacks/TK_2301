use std::{
    sync::{
        atomic::{AtomicUsize, Ordering},
        Arc,
    },
    time::Instant,
};

#[macro_use]
extern crate lazy_static;

use actix::*;
use actix_web::{
    middleware::Logger,
    web::{self},
    App, HttpRequest, HttpResponse, HttpServer, Responder,
};
use actix_web_actors::ws;
use lazy_static::lazy_static;
use serde::Deserialize;
use dotenvy::dotenv;



use crate::{auth::ENTRY_ROOM_UUID, utils::get_user_info_from_query};

mod auth;
mod server;
mod session;
mod utils;

#[derive(Debug, Deserialize)]
pub struct EntryParam {
    pub user_id: String,
    pub user_name: String,
}

async fn chat_route(
    req: HttpRequest,
    stream: web::Payload,
    srv: web::Data<Addr<server::ChatServer>>,
) -> Result<HttpResponse, actix_web::Error> {
    let (user_id, user_name) = get_user_info_from_query(req.query_string())?;

    let session = session::WsChatSession {
        user_id,
        hb_timestamp: Instant::now(),
        room_id: *ENTRY_ROOM_UUID,
        user_name,
        addr: srv.get_ref().clone(),
    };

    ws::start(session, &req, stream)
}

async fn get_count(count: web::Data<AtomicUsize>) -> impl Responder {
    let current_count = count.load(Ordering::SeqCst);
    format!("Visitors: {current_count}")
}

lazy_static! {
    static ref PORT: u16 = std::env::var("PORT").expect("PORT is not set").parse::<u16>().expect("port is not a number");
    static ref ADDR: String = std::env::var("ADDR").expect("ADDR is not set");
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // ログ出力の設定
    env_logger::init_from_env(
        env_logger::Env::new()
            .default_filter_or("info")
            .default_filter_or("debug"),
    );
    dotenv().ok();

    // チャットサーバのアクタ生成
    let app_state = Arc::new(AtomicUsize::new(0));
    let server = server::ChatServer::new(app_state.clone()).start();

    log::info!("starting HTTP server at http://{}:{}", *ADDR, *PORT);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::from(app_state.clone()))
            .app_data(web::Data::new(server.clone()))
            .route("/count", web::get().to(get_count))
            .route("/ws", web::get().to(chat_route))
            .wrap(Logger::default()) // ミドルウェア設定
    })
    .workers(2)
    .bind((ADDR.to_owned(), PORT.to_owned()))?
    .run()
    .await
}
