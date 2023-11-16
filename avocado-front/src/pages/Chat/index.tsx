import React, { FC, useEffect, useRef, useState } from "react"
import { Text, Button, TextInput } from "react-native"
import type { RootRoutesParamList } from "../../routes/Root"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"

type Props = NativeStackScreenProps<RootRoutesParamList, "ChatPage">
export const ChatPage: FC<Props> = () => {
  const socketRef = useRef<WebSocket>()

  // 画面に表示するチャットメッセージ配列
  const [messages, setMessages] = useState<string[]>([])

  const [sendMessage, onChangeSendMessage] = useState<string>("Let's chat")
  const [receivedMessage, setReceivedMessage] = useState<string>("")

  const addMessage = (e: any) => {
    setMessages([...messages, `${e}`])
  }

  const connectWebSocket = () => {
    if (socketRef.current) {
      return
    }

    socketRef.current = new WebSocket("ws://159.223.193.84:8080/ws")

    socketRef.current.onopen = () => {
      console.log("onopen: socket is open")
    }

    // Note: 以下の関数内でmessagesに直接変更を加えたいが、関数内でmessages配列の初期値が
    // 固定化されてしまうため、一度メッセージ受信用stateを噛ませる
    socketRef.current.onmessage = (e: WebSocketMessageEvent) => {
      console.log("received", e.data)

      setReceivedMessage(e.data)
    }

    socketRef.current.onerror = (e: any) => {
      console.log(e.message)
    }

    socketRef.current.onclose = (e: any) => {
      console.log(e.code, e.reason)
    }
  }

  useEffect(() => {
    connectWebSocket()
  }, [])

  // メッセージ受信時発火
  useEffect(() => {
    addMessage(receivedMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMessage])

  return (
    <>
      <TextInput
        style={{ color: "black" }}
        onChangeText={onChangeSendMessage}
        value={sendMessage}
      />

      <Button
        onPress={() => {
          socketRef.current?.send(sendMessage)
          addMessage(sendMessage)
          onChangeSendMessage("")
        }}
        title={"送信"}
      />
      {messages.map((message, index) => (
        <Text key={index} style={{ color: "black" }} selectionColor={"black"}>
          {message}
        </Text>
      ))}
    </>
  )
}
