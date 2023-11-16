import React from "react"
import { Button, Text, TouchableHighlight, View } from "react-native"
import { Props as ContainerProps } from "./index"
import styles from "./style"

type Props = {
  url: any
  style: any
  onClick?: () => void
} & ContainerProps

const PurpleButtonPresenter = ({ style, title, onClick }: Props) => {
  return (
    <TouchableHighlight onPress={onClick} style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  )
}

export default PurpleButtonPresenter
