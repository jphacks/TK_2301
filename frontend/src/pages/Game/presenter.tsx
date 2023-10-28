import React, { useEffect } from "react"
import { Modal, ScrollView, Text, View } from "react-native"
import TopHeader from "../../components/generics/TopHeader"
import IconScroll from "../../components/generics/IconScroll"
import Tabbar from "../../components/generics/Tabbar"
import { Props as ContainerProps } from "./index"
import styles from "./style"
import Characters from "../../components/generics/Characters"
import GameHeader from "./GameHeader"
import SelectCharacterCard from "./SelectCharacterCard"
import FloorMap from "./FloorMap"
import { useTabbar } from "../../context/tabbar.context"
import Info from "./Info"
import Vote from "./Vote"

type Props = {
  nowPhase: number
  navigation: any
  setNowPhase: React.Dispatch<React.SetStateAction<number>>
} & ContainerProps

const GamePresenter = ({
  scenario,
  nowPhase,
  navigation,
  setNowPhase
}: Props) => {
  const { showInfo } = useTabbar()
  const renderContent = () => {
    switch (nowPhase) {
      case 0:
        return (
          <ScrollView style={styles.normalContainer}>
            {scenario.characters.map((character, index) => (
              <View key={index} style={{ paddingBottom: 10 }}>
                <SelectCharacterCard key={index} character={character} />
              </View>
            ))}
          </ScrollView>
        )
      case 1:
        return (
          <View style={styles.normalContainer}>
            <Text style={{ color: "#fff" }}>
              画面下部の「情報」にキャラクターシートが配布されました。ミュートにした状態で読み込んで下さい。
            </Text>
          </View>
        )
      case 2:
        return (
          <View style={styles.floorMapContainer}>
            <FloorMap
              floorMap={scenario.floorMap}
              numberOfSurveys={scenario.numberOfSurveys}
            />
          </View>
        )
      case 3:
        return (
          <View style={styles.normalContainer}>
            <Vote characters={scenario.characters} />
          </View>
        )
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <GameHeader
        props={{
          title: scenario.phase[nowPhase],
          navigation,
          nowPhase,
          setNowPhase
        }}
      />
      <IconScroll />
      {renderContent()}
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={showInfo}
      >
        <Info scenario={scenario} />
      </Modal>
      <Tabbar isGame={true} />
      {/*showInfo && <Info />*/}
    </View>
  )
}

export default GamePresenter
