import React from "react"
import { Image, ImageSourcePropType, Text, View } from "react-native"
import styles from "./style"
import TabbarIcon from "../TabbarIcon"

type Props = {
  icons: {
    path: ImageSourcePropType
    title: string
    opacity: number
    onPress: () => void
  }[]
  setIsOpenInfo?: any
  isGame: boolean
}

const TabbarPresenter = ({ icons, isGame }: Props) => {
  return (
    <View style={styles.container}>
      {icons.map((icon, index) => {
        return (
          <TabbarIcon
            key={index}
            path={icon.path}
            title={icon.title}
            opacity={icon.opacity}
            onPress={icon.onPress}
            isGame={isGame}
          />
        )
      })}
    </View>
  )
}

export default TabbarPresenter
