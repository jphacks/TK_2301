import React from "react"
import TabbarPresenter from "./presenter"
import { ImageSourcePropType } from "react-native"
import { useTabbar } from "../../../context/tabbar.context"

type Props = {
  isGame: boolean
}
const Tabbar = ({ isGame }: Props) => {
  const {
    isInfoVisible,
    isChatVisible,
    isSettingsVisible,
    setShowInfo,
    setShowChat,
    setShowSettings
  } = useTabbar()
  const icons = [
    {
      path: require("./icons/mic.png"),
      title: "",
      opacity: 1,
      onPress: () => {}
    },
    {
      path: require("./icons/scenario.png"),
      title: "情報",
      opacity: 0.5,
      onPress: () => {
        if (isInfoVisible) {
          setShowInfo(true)
        }
      }
    },
    {
      path: require("./icons/chat.png"),
      title: "チャット",
      opacity: 0.5,
      onPress: () => {
        if (isChatVisible) {
          setShowChat(true)
        }
      }
    },
    {
      path: require("./icons/setting.png"),
      title: "設定",
      opacity: 0.5,
      onPress: () => {
        if (isSettingsVisible) {
          setShowSettings(true)
        }
      }
    }
  ]

  if (isInfoVisible) {
    ;(icons[1].path = require("./icons/scenario_active.png")),
      (icons[1].opacity = 1)
  }

  if (isChatVisible) {
    icons[2].opacity = 1
  }

  if (isSettingsVisible) {
    icons[3].opacity = 1
  }

  return <TabbarPresenter icons={icons} isGame={isGame} />
}

export default Tabbar
