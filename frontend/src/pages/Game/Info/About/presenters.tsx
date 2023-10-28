import React from "react"
import { ScrollView, Text, View } from "react-native"
import styles from "./style"

type Props = {
  about: string
}

const AboutPresenter = ({ about }: Props) => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>{about}</Text>
      </View>
    </ScrollView>
  )
}

export default AboutPresenter
