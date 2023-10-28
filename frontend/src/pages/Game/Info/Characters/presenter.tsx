import React from "react"
import { ScrollView, Text, View } from "react-native"
import SelectCharacterCard from "../../SelectCharacterCard"
import styles from "./style"
import { CharactersProps } from "../.."

const CharactersPresenter = ({ characters }: CharactersProps) => {
  return (
    <ScrollView style={styles.normalContainer}>
      {characters.map((character, index) => (
        <View style={{ paddingBottom: 10 }}>
          <SelectCharacterCard key={index} character={character} />
        </View>
      ))}
    </ScrollView>
  )
}

export default CharactersPresenter
