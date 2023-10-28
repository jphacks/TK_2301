import React from "react"
import { Text, TextInput, View, Image } from "react-native"
import styles from "./style"
import PurpleButton from "../../../components/generics/PurpleButton"

const SearchBarPresenter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={require("./icons/search.png")} />
        <TextInput
          style={styles.input}
          placeholder="シナリオを検索"
          placeholderTextColor="#888888"
        />
      </View>
    </View>
  )
}

export default SearchBarPresenter
