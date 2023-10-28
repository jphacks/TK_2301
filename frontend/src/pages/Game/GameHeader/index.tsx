import React, { useEffect } from "react"
import GameHaderPresenter from "./presenter"
import { useSocket } from "../../../context/socket.context"

export type Props = {
  props: {
    title: string
    navigation: any
    nowPhase: number
    setNowPhase: React.Dispatch<React.SetStateAction<number>>
  }
}

const GameHeader = ({ props }: Props) => {
  const { socketRef } = useSocket()
  useEffect(() => {
    const handleMessage = (event: WebSocketMessageEvent) => {
      // ここでサーバーからのメッセージを処理する
      if (event.data === "!confirm_ack") {
        props.setNowPhase((prev: number) => prev + 1)
      }
    }

    // メッセージ受信時のイベントハンドラーを設定
    socketRef.current?.addEventListener("message", handleMessage)

    // コンポーネントのクリーンアップ時にイベントハンドラーを削除
    return () => {
      socketRef.current?.removeEventListener("message", handleMessage)
    }
  }, [])
  const onClick = () => {
    socketRef.current?.send(`/ack`)
  }
  return <GameHaderPresenter props={props} onClick={onClick} />
}

export default GameHeader
