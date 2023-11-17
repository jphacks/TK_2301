import React from "react"
import { View, ScrollView } from "react-native"
import { colorCode } from "../../styles/general"
import InteractiveCircularIcon from "../../components/generics/InteractiveCircularIcon"
import Tabbar from "../../components/generics/Tabbar"
import IconScroll from "../../components/generics/IconScroll"

type Props = {}

const EventRoomPresenter: React.FC<Props> = ({}) => {
  return (
    <>
      <View
        style={{
          backgroundColor: colorCode.primaryBackground
        }}
      >
        <ScrollView horizontal style={{ backgroundColor: "black" }}>
          <IconScroll />
        </ScrollView>
        <Tabbar isGame={false} />
      </View>
    </>
  )
}

export default EventRoomPresenter
