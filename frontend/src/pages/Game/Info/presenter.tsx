import React from "react"
import { Image, Pressable, Text, View } from "react-native"
import { TabView, TabBar } from "react-native-tab-view"
import styles from "./style"
import { Props as ContainerProps } from "./index"

type Props = {
  tabViewProps: {
    index: number
    routes: {
      key: string
      title: string
    }[]
    renderScene: any
    setIndex: React.Dispatch<React.SetStateAction<number>>
    initialLayout: { width: number }
  }
  close: () => void
} & ContainerProps

const InfoPresenter = ({ close, tabViewProps, scenario }: Props) => {
  const { index, routes, renderScene, setIndex, initialLayout } = tabViewProps
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#5865F2" }}
      style={styles.tabBar}
      labelStyle={styles.label}
      scrollEnabled={true}
      layout={{
        width: 0,
        height: 0
      }}
    />
  )

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={styles.bar} />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>入手した情報</Text>
        <Pressable onPress={close}>
          <Image source={require("./close.png")} />
        </Pressable>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: initialLayout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  )
}

export default InfoPresenter
