import React from "react"
import { Pressable, Text, View, Image, ScrollView } from "react-native"
import styles from "./style"
import ScenarioItem from "../ScenarioItem"

type Props = {
  title: string
  navigation: any
}

const ScenarioSelectorPresenter = ({ title, navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.title}>{title}</Text>
        <Pressable style={styles.viewAllButton}>
          <Image source={require("./icons/く.png")} />
          <Text style={styles.viewAllButtonText}>すべて見る</Text>
        </Pressable>
      </View>
      <ScrollView horizontal>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          return (
            <ScenarioItem
              key={i}
              thumbnail={require("./a.png")}
              title={"マーダーミステリーゲーム"}
              rating={4}
              numberOfPeople={3}
              timeLimit={1}
              navigation={navigation}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default ScenarioSelectorPresenter
