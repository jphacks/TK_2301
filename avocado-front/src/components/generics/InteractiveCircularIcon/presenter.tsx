import React from "react"
import { Text, View } from "react-native"
import styles from "./style"
import CircularIcon from "../CircularIcon"

type Props = {
  name: string
  url: any
}

const InteractiveCircularIconPresenter = ({ name, url }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.interactiveLing}>
        <CircularIcon url={url} />
      </View>
      <View>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  )
}

export default InteractiveCircularIconPresenter
