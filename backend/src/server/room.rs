use serde::{Deserialize, Serialize};
use std::{
    collections::{HashMap, HashSet},
};
use uuid::Uuid;

#[derive(Debug)]
pub struct Room {
    pub room_id: Uuid,
    pub owner: Option<RoomUserInfo>, // 部屋の創設者及び管理人
    pub users: HashMap<String, RoomUserInfo>, // 部屋にいるユーザの情報
    pub parent_room_id: Option<Uuid>, // 親ルームのID. 密談部屋の作成時に必要
    pub character_map: HashMap<String, String>, // キャラクタとユーザの対応付け. key = キャラクタ名, name = ユーザ名
    pub ack_stack: HashSet<String>, // 承認数を管理するスタック. capはself.max_capとなる
    pub vote_box: HashMap<String, Ballot>, //投票を管理するボックス. key: 投票したユーザ名, value: 投票対象のデータ
    pub max_cap: usize, // 最大収容人数 = ゲームを遊ぶ人数
}

#[derive(Debug)]
pub struct Ballot {
    pub character_name: String, // 投票対象のキャラクタ名
    pub link_user_id: String, // 投票対象のキャラクタ名に紐づくユーザID
}

impl Room {
    pub fn new(room_id: Uuid, user_id: String, user_name: String) -> Room {
        Room {
            room_id,
            parent_room_id: None,
            users: HashMap::new(),
            owner: Some(RoomUserInfo {
                user_id: user_id.to_string(),
                user_name,
            }),
            character_map: HashMap::new(),
            ack_stack: HashSet::new(),
            vote_box: HashMap::new(),
            max_cap: 3,
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct RoomUserInfo {
    pub user_id: String,
    pub user_name: String,
}

impl RoomUserInfo {
    pub fn new(user_id: String, user_name: String) -> RoomUserInfo {
        RoomUserInfo {
            user_id: user_id.to_string(),
            user_name,
        }
    }
}
