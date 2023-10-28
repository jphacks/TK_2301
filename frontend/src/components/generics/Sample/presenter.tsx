import React from "react"
import { Image, Text, View } from "react-native"
import { Props as ContainerProps } from "./index"
import styles from "./style"

type Props = {
  url: any
} & ContainerProps

const SamplePresenter = ({ url }: Props) => {
  return <View style={styles.container}></View>
}

export default SamplePresenter
