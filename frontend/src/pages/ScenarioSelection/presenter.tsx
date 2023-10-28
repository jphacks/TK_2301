import React from "react"
import IconScroll from "../../components/generics/IconScroll"
import Tabbar from "../../components/generics/Tabbar"
import { ScrollView, View } from "react-native"
import TopHeader from "../../components/generics/TopHeader"
import styles from "./style"
import SearchBar from "./SearchBar"
import ScenarioSelector from "../../components/generics/ScenarioSelector"
import PurpleButton from "../../components/generics/PurpleButton"

type Props = {
  navigation: any
}

const ScenarioSelectionPresenter = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <TopHeader />
      <IconScroll />

      <View style={styles.searchBarContainer}>
        <SearchBar />
        <PurpleButton
          title={"絞り込み"}
          style={styles.purpleButton}
        ></PurpleButton>
      </View>

      <ScrollView style={styles.container}>
        <ScenarioSelector
          title="メンバー募集中のシナリオ"
          navigation={navigation}
        />
        <ScenarioSelector title="新着シナリオ" navigation={navigation} />
        <ScenarioSelector title="ランキング" navigation={navigation} />
      </ScrollView>

      <Tabbar isGame={false} />
    </View>
  )
}

export default ScenarioSelectionPresenter
