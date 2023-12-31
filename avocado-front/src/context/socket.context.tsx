import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Room, User} from '../type';
import {useGame} from '../pages/Game/game.context';
import {GameItem, Item} from '../models/scenario';

type SocketContextType = {
  socketRef: React.MutableRefObject<WebSocket | undefined>;
  rooms: Room[];
  sessionUsers: User[];
  setSessionUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export const SocketProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [sessionUsers, setSessionUsers] = useState<User[]>([]);
  const [receivedMessage, setReceivedMessage] = useState<string>('');
  const socketRef = useRef<WebSocket>();
  const {
    setSelectedCharacters,
    setItems,
    setNowPhase,
    setMyItems,
    setUsersOnTheFloor,
    setIsLoading,
  } = useGame();

  useEffect(() => {
    connectWebSocket();
  }, []);

  const connectWebSocket = () => {
    if (socketRef.current) {
      return;
    }

    socketRef.current = new WebSocket(
      'http://163.43.128.144:8080/ws?user_id=4NvyfXM7sVT5mckHovqWyLnisrf1&user_name=test',
    );

    socketRef.current.onopen = () => {
      console.log('onopen: socket is open');
    };

    // Note: 以下の関数内でmessagesに直接変更を加えたいが、関数内でmessages配列の初期値が
    // 固定化されてしまうため、一度メッセージ受信用stateを噛ませる
    socketRef.current.onmessage = (e: WebSocketMessageEvent) => {
      console.log('received', e.data);
      // e.data内をスペースで分割して配列にし、二つ目の要素をjsonとしてパースする
      const dataArray = e.data.split(' ');

      try {
        if (dataArray[0] === '!json') {
          setRooms(JSON.parse(dataArray[1]));
        } else if (dataArray[0] === '!select') {
          console.log(dataArray[0]);
          const characterInfo = {
            characterName: dataArray[2],
            uid: dataArray[1],
          };
          setSelectedCharacters(prev => [...prev, characterInfo]);
          console.log('setSelectedCharacters');
        } else if (dataArray[0] === '!confirm_ack') {
          setIsLoading(false);
          setNowPhase((prev: number) => prev + 1);
        } else if (dataArray[0] === '!someone_get') {
          setItems(prev => {
            return prev.map(item => {
              if (item.itemId === dataArray[1]) {
                item.isAvailable = false;
              }
              return item;
            });
          });
        } else if (dataArray[0] === '!hand_recv') {
          setMyItems(prev => [...prev, dataArray[1]]);
        } else if (dataArray[0] === '!entry') {
          setUsersOnTheFloor(prev => {
            const newMap = new Map(prev);
            // key: dataArray[1]がある場合には、valueにdataArray[2]を追加、なければ新規作成してvalueにdataArray[2]を追加
            const users = newMap.get(dataArray[1]);
            if (users) {
              newMap.set(dataArray[1], [...users, dataArray[2]]);
            } else {
              newMap.set(dataArray[1], [dataArray[2]]);
            }
            return newMap;
          });
        } else if (dataArray[0] === '!exit') {
          setUsersOnTheFloor(prev => {
            const newMap = new Map(prev);
            // key: dataArray[1], value: [dataArray[2]]を削除
            const users = newMap.get(dataArray[1]);
            if (users) {
              const newUsers = users.filter(user => user !== dataArray[2]);
              newMap.set(dataArray[1], newUsers);
            }
            return newMap;
          });
        } else if (dataArray[0] === '!confirm_vote') {
          setNowPhase((prev: number) => prev + 1);
        } else if (dataArray[0] === '!hand_recv') {
          setMyItems(prev => [...prev, dataArray[1]]);
        }
      } catch (error) {
        throw new Error('Failed to parse the second element as JSON');
      }

      setReceivedMessage(e.data);
    };

    socketRef.current.onerror = (e: any) => {
      console.error(e.message);
    };

    socketRef.current.onclose = (e: any) => {
      console.error(e.code, e.reason);
    };
  };

  return (
    <SocketContext.Provider
      value={{socketRef, rooms, sessionUsers, setSessionUsers}}>
      {children}
    </SocketContext.Provider>
  );
};
