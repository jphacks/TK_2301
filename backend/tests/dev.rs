#![allow(unused)]

use anyhow::Result;
use serde::Deserialize;
use serde_json::json;

use std::io::stdin;
use std::sync::mpsc::channel;
use std::thread;

use websocket::client::ClientBuilder;
use websocket::{Message, OwnedMessage};

const CONNECTION: &'static str = "ws://0.0.0.0:8080/ws?user_id=testtest";
use uuid::Uuid;

// #[tokio::test]
// async fn quick_dev() -> Result<()> {
//     let hc = httpc_test::new_client("ws://0.0.0.0:8080")?;

//     hc.do_get("/ws")await?.print().await?;

//     Ok(())
// }

#[derive(serde::Serialize, Deserialize, Debug)]
struct MyData {
    user_id: String,
}

#[tokio::test]
async fn quick_dev_2() -> Result<()> {
    use reqwest;

    // let hc = httpc_test::new_client("ws://0.0.0.0:8080")?;

    let data = MyData {
        user_id: "testtest".to_string(),
    };

    // JSONデータをシリアライズしてリクエストボディに設定
    let json_data = serde_json::to_string(&data)?;

    let client = reqwest::Client::new();
    let response = client
        .get("ws://0.0.0.0:8080/ws")
        .header("Content-Type", "application/json")
        // .body(json_data)
        .send()
        .await?;

    Ok(())
}

#[tokio::test]
async fn create_uuid_from_byte() -> Result<()> {
    let entry_room_id = Uuid::from_slice(b"entry").unwrap();

    Ok(())
}

#[tokio::test]
async fn create_uuid_from_same_byte() -> Result<()> {
    const CONNECTION: &'static str = "ws://0.0.0.0:8080/ws?user_id=testtest";

    let client = ClientBuilder::new(CONNECTION);

    Ok(())
}

#[tokio::test]
async fn access_success() -> Result<()> {
    let addr = format!(
        "ws://0.0.0.0:8080/ws?user_id={}?user_name={}",
        &Uuid::new_v4().to_string(),
        "test"
    );

    let result = ClientBuilder::new(&addr)
        .unwrap()
        .add_protocol("rust-websocket")
        .connect_insecure();

    assert!(result.is_ok());

    Ok(())
}

#[tokio::test]
async fn access_failure_with_invalid_user_id() -> Result<()> {
    let addr = format!("ws://0.0.0.0:8080/ws?user_id={}", "invalid_user_id");

    let result = ClientBuilder::new(&addr)
        .unwrap()
        .add_protocol("rust-websocket")
        .connect_insecure();

    assert!(result.is_err());

    Ok(())
}
