import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import { Room } from "../type"
import { useGame } from "../pages/Game/game.context"

type SocketContextType = {
  socketRef: React.MutableRefObject<WebSocket | undefined>
  rooms: Room[]
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function useSocket() {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [receivedMessage, setReceivedMessage] = useState<string>("")
  const socketRef = useRef<WebSocket>()
  const { setMyCharacter, selectedCharacters, setSelectedCharacters } =
    useGame()

  useEffect(() => {
    connectWebSocket()
  }, [])

  const connectWebSocket = () => {
    if (socketRef.current) {
      return
    }

    socketRef.current = new WebSocket(
      "ws://0.0.0.0:8080/ws?user_id=4NvyfXM7sVT5mckHovqWyLnisrf1&user_name=test"
    )

    socketRef.current.onopen = () => {
      console.log("onopen: socket is open")
    }

    // Note: 以下の関数内でmessagesに直接変更を加えたいが、関数内でmessages配列の初期値が
    // 固定化されてしまうため、一度メッセージ受信用stateを噛ませる
    socketRef.current.onmessage = (e: WebSocketMessageEvent) => {
      console.log("received", e.data)
      // e.data内をスペースで分割して配列にし、二つ目の要素をjsonとしてパースする
      const dataArray = e.data.split(" ")

      try {
        if (dataArray[0] === "!json") {
          setRooms(JSON.parse(dataArray[1]))
        } else if (dataArray[0] === "!select") {
          // {characterName: dataArray[2], uid: dataArray[3]}を追加する
          setSelectedCharacters([
            ...(selectedCharacters || []),
            { characterName: dataArray[3], uid: dataArray[2] }
          ])
        }
      } catch (error) {
        throw new Error("Failed to parse the second element as JSON")
      }

      setReceivedMessage(e.data)
    }

    socketRef.current.onerror = (e: any) => {
      console.error(e.message)
    }

    socketRef.current.onclose = (e: any) => {
      console.error(e.code, e.reason)
    }
  }

  return (
    <SocketContext.Provider value={{ socketRef, rooms }}>
      {children}
    </SocketContext.Provider>
  )
}
