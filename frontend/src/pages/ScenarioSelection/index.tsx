import React, { FC } from "react"
import ScenarioSelectionPresenter from "./presenter"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootRoutesParamList } from "../../routes/Root"

type Props = NativeStackScreenProps<
  RootRoutesParamList,
  "ScenarioSelectionPage"
>

const ScenarioSelection: FC<Props> = ({ navigation }) => {
  return <ScenarioSelectionPresenter navigation={navigation} />
}

export default ScenarioSelection
