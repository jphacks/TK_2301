import React from "react"
import { View, Text, Image } from "react-native"
import { Props as ContainerProps } from "./index"
import styles from "./style"

const CharacterCardPresenter = ({ character }: ContainerProps) => {
  const { icon, nameKanji, nameKana, age, profession, description } = character
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.name}>
          {nameKanji}
          {nameKana}({age})
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.profession}>職業:{profession}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )
}

export default CharacterCardPresenter
