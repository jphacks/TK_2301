use uuid::Uuid;

const ENTRY_ROOM: &'static [u8] = b"entry___________";

fn main() {
    let id = Uuid::from_slice(b"entry___________").unwrap();
    println!("{id}");
    let id2 = Uuid::from_slice(ENTRY_ROOM).unwrap();

    assert_eq!(id, id2);
}
