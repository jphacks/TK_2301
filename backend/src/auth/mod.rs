use uuid::Uuid;

use lazy_static::lazy_static;

lazy_static! {
    pub static ref ENTRY_ROOM_UUID: Uuid = Uuid::from_slice(b"entry___________").unwrap();
}
