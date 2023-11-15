use std::time::Instant;

use actix::prelude::*;
use actix_web_actors::ws;
use uuid::Uuid;

use crate::server::{handler::{Ack, AckCancel, ClientMessage, Create, Join, JoinScenario, ListRooms, Message, Scenario, SetNum, Hand, Select, Vote, Get, Entry, Exit}};

use super::WsChatSession;

impl Handler<Message> for WsChatSession {
    type Result = ();

    fn handle(&mut self, msg: Message, ctx: &mut Self::Context) {
        ctx.text(msg.0);
    }
}

/// WebSocket message handler
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for WsChatSession {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        let msg = match msg {
            Err(_) => {
                ctx.stop();
                return;
            }
            Ok(msg) => msg,
        };

        // log::debug!("WEBSOCKET MESSAGE: {msg:?}");
        match msg {
            ws::Message::Ping(msg) => {
                self.hb_timestamp = Instant::now();
                ctx.pong(&msg);
            }
            ws::Message::Pong(_) => {
                self.hb_timestamp = Instant::now();
            }
            ws::Message::Text(text) => {
                let m = text.trim();

                if m.starts_with('/') {
                    let v: Vec<&str> = m.splitn(3, ' ').collect();
                    match v[0] {
                        "/list" => {
                            if v.len() != 1 {
                                ctx.text("error: expected arguments is 1");
                                return;
                            }

                            // response
                            println!("List rooms");
                            self.addr
                                .send(ListRooms)
                                .into_actor(self)
                                .then(|res, _, ctx| {
                                    match res {
                                        Ok(rooms) => {
                                            for room in rooms {
                                                ctx.text(room);
                                            }
                                        }
                                        _ => println!("Something is wrong"),
                                    }
                                    fut::ready(())
                                })
                                .wait(ctx)
                        }
                        "/create" => {
                            if v.len() != 1 {
                                ctx.text("error: expected arguments is 1");
                                return;
                            }

                            let new_room_id = Uuid::new_v4();
                            let current_room_id = self.room_id.clone();
                            self.room_id = new_room_id;

                            self.addr.do_send(Create {
                                user_id: self.user_id.clone(),
                                user_name: self.user_name.clone(),
                                current_room_id,
                                new_room_id,
                            });

                            ctx.text("created room successfully");
                            ctx.text(format!("new room_id: {}", self.room_id));
                        }
                        "/join_room" => {
                            if v.len() != 2 {
                                ctx.text("error: expected arguments is 2");
                                return;
                            }

                            let join_room_id = Uuid::parse_str(v[1]).unwrap();
                            let current_room_id = self.room_id;

                            self.room_id = join_room_id;

                            self.addr.do_send(Join {
                                user_id: self.user_id.clone(),
                                user_name: self.user_name.clone(),
                                current_room_id,
                                join_room_id,
                            });
                        }
                        "/name" => {
                            if v.len() != 1 {
                                ctx.text("error: expected arguments is 1");
                                return;
                            }

                            self.user_name = v[1].to_owned();
                        }
                        "/ack" => {
                            if v.len() != 1 {
                                ctx.text("error: expected arguments is 1");
                                return;
                            }

                            self.addr.do_send(Ack {
                                user_name: self.user_name.clone(),
                                room_id: self.room_id,
                                user_id: self.user_id.clone(),
                            });
                        }
                        "/rm_ack" => {
                            if v.len() != 1 {
                                ctx.text("error: expected arguments is 1");
                                return;
                            }

                            self.addr.do_send(AckCancel {
                                user_name: self.user_name.clone(),
                                room_id: self.room_id,
                                user_id: self.user_id.clone(),
                            });
                        }
                        "/set_num" => {
                            if v.len() != 2 {
                                ctx.text("error: expected arguments is 1");
                                return;
                            }

                            let cap_number: usize = v[1].parse::<usize>().unwrap();

                            self.addr.do_send(SetNum {
                                user_name: self.user_name.clone(),
                                room_id: self.room_id,
                                cap_number,
                            });
                        }
                        "/sce" => {
                            if v.len() != 2 {
                                ctx.text("error: expected arguments is 2");
                                return;
                            }

                            let scenario_id: String = v[1].to_owned();

                            self.addr.do_send(Scenario {
                                user_id: self.user_id.to_string(),
                                user_name: self.user_name.clone(),
                                room_id: self.room_id,
                                scenario_id,
                            });
                        }
                        "/join_sce" => {
                            if v.len() != 2 {
                                ctx.text("error: expected arguments is 2");
                                return;
                            }

                            let scenario_id: String = v[1].to_owned();

                            self.addr.do_send(JoinScenario {
                                user_id: self.user_id.to_string(),
                                user_name: self.user_name.clone(),
                                room_id: self.room_id,
                                scenario_id,
                            });
                        }
                        "/me" => {
                            if v.len() != 1 {
                                ctx.text("error: expected arguments is 1");
                                return;
                            }

                            ctx.text(format!("user_id: {}", self.user_id));
                            ctx.text(format!("user_name: {}", self.user_name));
                            ctx.text(format!("in room: {}", self.room_id));
                        }
                        "/hand" => {
                            if v.len() != 3 {
                                ctx.text("error: expected arguments is 3");
                                return;
                            }

                            let item_id: String = v[1].to_owned();
                            let dst_user_id: String = v[2].to_owned();

                            self.addr.do_send(Hand {
                                src_user_id: self.user_id.to_string(),
                                user_name: self.user_name.clone(),
                                dst_user_id,
                                room_id: self.room_id,
                                item_id,
                            });
                        }
                        "/select" => {
                            if v.len() != 2 {
                                ctx.text("error: expected arguments is 2");
                                return;
                            }

                            let character_name: String = v[1].to_owned();

                            self.addr.do_send(Select {
                                user_id: self.user_id.to_string(),
                                user_name: self.user_name.clone(),
                                room_id: self.room_id,
                                character_name,
                            });
                        }
                        "/vote" => {
                            if v.len() != 3 {
                                ctx.text("error: expected arguments is 3");
                                return;
                            }

                            let character_name: String = v[1].to_owned();
                            let link_user_id: String = v[2].to_owned();

                            self.addr.do_send(Vote {
                                room_id: self.room_id,
                                user_id: self.user_id.to_string(),
                                user_name: self.user_name.clone(),
                                character_name,
                                link_user_id,
                            });
                        }
                        "/get" => {
                            if v.len() != 2 {
                                ctx.text("error: expected arguments is 2");
                                return;
                            }

                            self.addr.do_send(Get {
                                src: self.get_src(),
                                item_id: v[1].to_owned(),
                            });
                        }
                        "/enter" => {
                            if v.len() != 2 {
                                ctx.text("error: expected arguments is 2");
                                return;
                            }
                            
                            self.addr.do_send(Entry {
                                src: self.get_src(),
                                map_id: v[1].to_owned(),
                            });
                        }
                        "/exit" => {
                            if v.len() != 2 {
                                ctx.text("error: expected arguments is 2");
                                return;
                            }
                            
                            self.addr.do_send(Exit {
                                src: self.get_src(),
                                map_id: v[1].to_owned(),
                            });
                        }
                        _ => ctx.text(format!("!!! unknown command: {m:?}")),
                    }

                    return;
                }

                let msg = m.to_owned();

                // send message to chat server
                self.addr.do_send(ClientMessage {
                    user_id: self.user_id.clone(),
                    user_name: self.user_name.clone(),
                    msg,
                    room: self.room_id.clone(),
                })
            }
            ws::Message::Binary(_) => println!("Unexpected binary"),
            ws::Message::Close(reason) => {
                ctx.close(reason);
                ctx.stop();
            }
            ws::Message::Continuation(_) => {
                ctx.stop();
            }
            ws::Message::Nop => (),
        }
    }
}
