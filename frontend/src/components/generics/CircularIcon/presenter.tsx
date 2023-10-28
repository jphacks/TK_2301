import React from "react"
import { Image } from "react-native"
import styles from "./style"

type Props = {
  url: any
  styles: any
}

const CircularIconPresenter = (props: Props) => {
  return (
    <Image
      source={{ uri: props.url.uri }}
      style={[styles.circularImage, props.styles]}
    />
  )
}

export default CircularIconPresenter
