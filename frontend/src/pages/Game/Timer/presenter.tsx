import React from "react"
import { Text, View } from "react-native"
import styles from "./style"

type Props = {
  minutes: number
  seconds: number
}

const TimerPresenter = ({ minutes, seconds }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </Text>
    </View>
  )
}

export default TimerPresenter
