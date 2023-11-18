import React from "react"
import { Text, View } from "react-native"
import styles from "./style"
import CircularIcon from "../CircularIcon"

type Props = {
  icon: any
  name: string
}

const UserBarPresenter = ({ icon, name }: Props) => {
  return (
    <View>
      <View style={styles.container}>
        <CircularIcon url={icon} styles={styles.icon}></CircularIcon>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  )
}

export default UserBarPresenter
