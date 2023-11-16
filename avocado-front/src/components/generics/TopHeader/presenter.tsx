import React from "react"
import { Text, View, Image, Pressable } from "react-native"
import styles from "./style"

const TopHeaderPresenter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerLeft}>
        <Pressable>
          <Image style={styles.icon} source={require("./icons/setting.png")} />
        </Pressable>
        <Pressable>
          <Image style={styles.icon} source={require("./icons/help.png")} />
        </Pressable>
      </View>
      <View style={styles.headerRight}>
        <Pressable>
          <Image style={styles.icon} source={require("./icons/exit.png")} />
        </Pressable>
      </View>
    </View>
  )
}

export default TopHeaderPresenter
