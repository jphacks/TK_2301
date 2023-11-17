import React from "react"
import TabbarIconPresenter from "./presenter"
import { ImageSourcePropType } from "react-native"

export type Props = {
  path: ImageSourcePropType
  title: string
  isGame: boolean
  opacity: number
  onPress: () => void
}

const TabbarIcon = ({ path, title, isGame, onPress, opacity }: Props) => {
  return (
    <TabbarIconPresenter
      path={path}
      title={title}
      opacity={opacity}
      onPress={onPress}
      isGame={isGame}
    />
  )
}

export default TabbarIcon
