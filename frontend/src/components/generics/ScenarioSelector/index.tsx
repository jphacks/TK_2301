import React from "react"
import { View } from "react-native"
import ScenarioSelectorPresenter from "./presenter"

type Props = {
  title: string
  navigation: any
}

const ScenarioSelector = ({ title, navigation }: Props) => {
  return <ScenarioSelectorPresenter title={title} navigation={navigation} />
}

export default ScenarioSelector
