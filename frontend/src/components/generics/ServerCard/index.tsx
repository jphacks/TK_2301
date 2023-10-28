import React from "react"
import ServerCardPresenter from "./presenter"
import { User } from "../../../type"
import { useSocket } from "../../../context/socket.context"
import { useUser } from "../../../context/user.context"

export type Props = {
  serverName: string
  serverId: string
  userList: User[]
  onClick?: () => void
  navigation?: any
}

const ServerCard = ({ serverName, serverId, userList, navigation }: Props) => {
  const { socketRef } = useSocket()
  const { user } = useUser()
  const onClick = () => {
    socketRef.current?.send(`/join_room ${serverId}`)
    socketRef.current?.send(`/list`)
    navigation.navigate("ScenarioSelectionPage")
  }
  return (
    <ServerCardPresenter
      serverName={serverName}
      serverId={serverId}
      userList={userList}
      onClick={onClick}
    />
  )
}

export default ServerCard
