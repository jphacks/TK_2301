use std::time::{Duration, Instant};

use actix::prelude::*;
use actix_web_actors::ws;
use uuid::Uuid;

use crate::server::{
    self,
    handler::{Connect, Disconnect},
};

mod handler;

/// pingを送って死活状態を確認する間隔
const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(5);

/// 
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);

#[derive(Debug)]
pub struct WsChatSession {
    /// ユーザID (セッションIDと同義)
    pub user_id: String,

    /// 参加中のルームID
    pub room_id: Uuid,

    /// 参加者のユーザ名
    pub user_name: String,

    /// サーバのアドレス情報
    pub addr: Addr<server::ChatServer>,

    /// 定期的にping/pongを行った時刻記録
    pub hb_timestamp: Instant,
}

impl WsChatSession {
    /// 5秒ごとにpingを送り、死活状態を確認する (HEARTBEAT_INTERVAL).
    fn hb(&self, ctx: &mut ws::WebsocketContext<Self>) {
        // 5秒毎に永続稼動
        ctx.run_interval(HEARTBEAT_INTERVAL, |act, ctx| {
            if Instant::now().duration_since(act.hb_timestamp) > CLIENT_TIMEOUT {
                println!("Websocket Client heartbeat failed, disconnecting!");

                act.addr.do_send(Disconnect {
                    user_id: act.user_id.clone(),
                });
                ctx.stop();

                return;
            }

            ctx.ping(b"");
        });
    }
}

impl Actor for WsChatSession {
    type Context = ws::WebsocketContext<Self>;

    /// Method is called on actor start.
    /// We register ws session with ChatServer
    fn started(&mut self, ctx: &mut Self::Context) {
        // we'll start heartbeat process on session start.
        self.hb(ctx);

        let addr = ctx.address();
        self.addr
            .send(Connect {
                user_id: self.user_id.clone(),
                addr: addr.recipient(),
                user_name: self.user_name.clone(),
            })
            .into_actor(self)
            .then(|res, act, ctx| {
                match res {
                    Ok(res) => {
                        // act.addr = addr.recipient()
                    }
                    _ => ctx.stop(),
                }
                fut::ready(())
            })
            .wait(ctx);
    }

    fn stopping(&mut self, _: &mut Self::Context) -> Running {
        // notify chat server
        self.addr.do_send(Disconnect {
            user_id: self.user_id.clone(),
        });
        Running::Stop
    }
}
