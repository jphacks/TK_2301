import React from "react"
import { View, Image, Text } from "react-native"
import styles from "./style"
import { Props } from "./index"

const ImpressionCardPresenter = ({ props }: Props) => {
  const { icon, name, comment } = props
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  )
}

export default ImpressionCardPresenter
