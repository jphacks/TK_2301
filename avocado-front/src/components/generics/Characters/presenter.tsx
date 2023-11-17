import React from "react"
import { View } from "react-native"
import styles from "./style"
import { Props } from "./index"
import CharacterCard from "../CharacterCard"

const CharactersPresenter = ({ characters }: Props) => {
  return (
    <View style={styles.characterCardContainer}>
      {characters.map((character, i) => {
        return (
          <View key={i} style={styles.charcterCard}>
            <CharacterCard character={character} />
          </View>
        )
      })}
    </View>
  )
}

export default CharactersPresenter
