import React from "react"
import { Image, ImageSourcePropType, Pressable, Text, View } from "react-native"
import { Props as ContainerProps } from "./index"
import styles from "./style"

type Props = {} & ContainerProps

const TabbarIconPresenter = ({
  path,
  title,
  opacity,
  isGame,
  onPress
}: Props) => {
  return (
    <View>
      <Pressable
        style={[
          styles.iconContainer,
          title === "" ? styles.micIconContainer : null,
          { opacity: opacity }
        ]}
        onPress={onPress}
      >
        <Image source={path} style={styles.icon} />
        {title !== "" && <Text style={styles.title}>{title}</Text>}
      </Pressable>
    </View>
  )
}

export default TabbarIconPresenter
