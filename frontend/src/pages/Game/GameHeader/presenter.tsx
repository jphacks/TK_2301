import React from "react"
import { Text, View } from "react-native"
import styles from "./style"
import PurpleButton from "../../../components/generics/PurpleButton"
import { Props as ContainerProps } from "./index"
import Timer from "../Timer"

type Props = {
  onClick: () => void
} & ContainerProps

const GameHaderPresenter = ({ props, onClick }: Props) => {
  const switchRender = () => {
    switch (props.nowPhase) {
      case 0:
        return (
          <PurpleButton
            onClick={onClick}
            title={"次へ"}
            style={styles.purpleButton}
          />
        )
      case 1:
        return (
          <Timer
            key="timer1"
            initialTime={"00:20"}
            setNowPhase={props.setNowPhase}
          />
        )
      case 2:
        return (
          <Timer
            key="timer2"
            initialTime={"10:20"}
            setNowPhase={props.setNowPhase}
          />
        )
      case 3:
        return (
          <PurpleButton
            onClick={onClick}
            title={"次へ"}
            style={styles.purpleButton}
          />
        )
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      {switchRender()}
    </View>
  )
}

export default GameHaderPresenter
