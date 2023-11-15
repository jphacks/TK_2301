use std::{
    collections::{HashMap, HashSet},
    sync::{atomic::AtomicUsize, Arc},
};
use actix::prelude::*;
use handler::Message;
use uuid::Uuid;
use crate::auth::ENTRY_ROOM_UUID;
use self::room::Room;

pub mod handler;
pub mod room;

#[derive(Debug)]
pub struct ChatServer {
    sessions: HashMap<String, Recipient<Message>>,
    rooms: HashMap<Uuid, Room>,
}

// メッセージの送信元の情報
#[derive(Debug)]
pub struct Src {
    pub room_id: Uuid,
    pub user_id: String,
    pub user_name: String,
}

impl ChatServer {
    pub fn new(_visitor_count: Arc<AtomicUsize>) -> ChatServer {
        let mut rooms = HashMap::new();

        rooms.insert(
            *ENTRY_ROOM_UUID,
            Room::new(*ENTRY_ROOM_UUID, "admin_id".to_owned(), "admin".to_owned()),
        );

        ChatServer {
            sessions: HashMap::new(),
            rooms,
        }
    }
}

impl ChatServer {
    fn multicast_message(&self, room_id: &Uuid, message: &str, skip_user_id: &str) {
        if let Some(room) = self.rooms.get(room_id) {
            for (id, _) in &room.users {
                if *id == *skip_user_id {
                    continue;
                }

                if let Some(addr) = self.sessions.get(&*id) {
                    addr.do_send(Message(message.to_owned()));
                }
            }
        }
    }

    fn unicast_message(&self, message: &str, target_user_id: &str) {
        if let Some(addr) = self.sessions.get(&target_user_id.to_owned()) {
            addr.do_send(Message(message.to_owned()));
        }
    }
}

impl Actor for ChatServer {
    type Context = Context<Self>;
}
