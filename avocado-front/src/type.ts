export type User = {
  user_id: string;
  user_name: string;
};

export type Room = {
  room_id: string;
  owner: User;
  users: User[];
};
