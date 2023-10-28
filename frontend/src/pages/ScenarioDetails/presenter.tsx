import React, { FC } from "react"
import { View, Text, Image, ScrollView } from "react-native"
import TopHeader from "../../components/generics/TopHeader"
import IconScroll from "../../components/generics/IconScroll"
import Tabbar from "../../components/generics/Tabbar"
import Evaluation from "../../components/generics/Evaluation"
import styles from "./style"
import PurpleButton from "../../components/generics/PurpleButton"
import CharacterCard from "../../components/generics/CharacterCard"
import PrimaryButton from "../../components/generics/PrimaryButton"
import ImpressionCard from "./impressionCard"
import ScenarioSelector from "../../components/generics/ScenarioSelector"
import ServerCard from "../../components/generics/ServerCard"
import { colorCode } from "../../styles/general"
import Characters from "../../components/generics/Characters"

type Props = {
  thumbnail: any
  title: string
  rating: number
  numberOfPeople: number
  timeLimit: string
  author: string
  authorIcon: any
  outline: string
  characters: {
    icon: any
    nameKanji: string
    nameKana: string
    age: number
    profession: string
    description: string
  }[]
  scenarioFlow: string[]
  impressions: {
    icon: any
    name: string
    comment: string
  }[]
  isCapacity: boolean
  navigation: any
  nowPlay: () => void
}

const ScenarioDetailsPresenter: FC<Props> = ({
  thumbnail,
  title,
  rating,
  numberOfPeople,
  timeLimit,
  author,
  authorIcon,
  outline,
  characters,
  scenarioFlow,
  impressions,
  isCapacity,
  navigation,
  nowPlay
}) => {
  return (
    <View style={{ flex: 1 }}>
      <TopHeader />
      <IconScroll />

      <ScrollView style={{ backgroundColor: colorCode.primaryBackground }}>
        <Image source={thumbnail} style={styles.image} />

        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.evaluation}>
              <Text style={styles.rating}>{rating.toFixed(1)}</Text>
              <Evaluation rating={rating} />
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>{numberOfPeople}人/</Text>
              <Text style={styles.infoText}>{timeLimit}</Text>
            </View>
          </View>

          <View style={styles.authorContainer}>
            <View style={styles.author}>
              <Image source={authorIcon} style={styles.authorIcon} />
              <Text style={styles.authorName}>{author}</Text>
            </View>
            <PurpleButton
              title={"お気に入り"}
              style={styles.purpleButton}
            ></PurpleButton>
          </View>

          <View style={styles.outline}>
            <Text style={styles.outlineText}>{outline}</Text>
          </View>

          <Characters characters={characters} />

          <View style={styles.scenarioFlowContainer}>
            <Text style={styles.sectionTitle}>シナリオの流れ</Text>
            {scenarioFlow.map((flow, i) => {
              return (
                <View key={i} style={styles.scenarioFlow}>
                  <Text style={styles.scenarioFlowText}>・{flow}</Text>
                </View>
              )
            })}
          </View>

          {isCapacity ? (
            <View style={styles.primaryButton}>
              <PrimaryButton
                onPress={nowPlay}
                text={"今すぐあそぶ"}
                width={320}
              />
            </View>
          ) : (
            <View>
              <View style={styles.serverCard}>
                <ServerCard
                  serverName={"yama"}
                  serverId={"0801"}
                  userList={[
                    {
                      user_name: "takt",
                      user_id: "4NvyfXM7sVT5mckHovqWyLnisrf1"
                    }
                  ]}
                />
              </View>
              <View style={styles.primaryButton}>
                <PrimaryButton
                  onPress={() => console.log("Button pressed")}
                  text={"だれかを募集してあそぶ"}
                />
              </View>
            </View>
          )}

          <View style={styles.impressionContainer}>
            <Text style={styles.sectionTitle}>シナリオの感想</Text>
            {impressions.map((impression, i) => {
              return (
                <View key={i} style={styles.impressionCard}>
                  <ImpressionCard props={impression} />
                </View>
              )
            })}
          </View>

          <View>
            <ScenarioSelector title="製作者の作品" navigation={navigation} />
          </View>
        </View>
      </ScrollView>

      <Tabbar isGame={false} />
    </View>
  )
}

export default ScenarioDetailsPresenter
