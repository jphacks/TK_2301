import React from "react"
import { Text, View } from "react-native"
import { Props } from "./index"
import styles from "./style"
import UserBar from "../UserBar"
import PurpleButton from "../PurpleButton"

const ServerCardPresenter = ({
  serverName,
  serverId,
  userList,
  onClick
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{serverName}のサーバ</Text>
        <PurpleButton
          style={styles.headerButton}
          title={"入室申請"}
          onClick={onClick}
        ></PurpleButton>
      </View>
      <Text style={styles.subText}>ID : {serverId}</Text>
      {userList.map((user, index) => {
        return <UserBar user={user} key={index}></UserBar>
      })}
    </View>
  )
}

export default ServerCardPresenter
