import React from "react"
import { Image, ImageBackground, Text, View } from "react-native"
import { Props } from "./index"
import styles from "./style"
import QuestionIcon from "./QuesctionIcon.tsx"
import { useFloor } from "./floor.context"
import SurveyCard from "./SurveyCard"
import ItemCard from "./ItemCard"

const FloorPresenter = ({ floor, surveysCount, minusSurveysCount }: Props) => {
  const { showSurveyCard, showItemCard, itemId } = useFloor()
  return (
    <View style={styles.container}>
      <ImageBackground
        source={floor.background}
        style={styles.background}
        resizeMode="cover"
      >
        {floor.items.map((item, index) => {
          return <QuestionIcon key={index} itemId={item.id} />
        })}

        {showSurveyCard && itemId && (
          // floor.itemsの中からitemIdと一致するitemを探す
          <SurveyCard
            item={floor.items.find((item) => item.id === itemId)}
            surveysCount={surveysCount}
          />
        )}

        {showItemCard && itemId && (
          <ItemCard
            item={floor.items.find((item) => item.id === itemId)}
            minusSurveysCount={minusSurveysCount}
          />
        )}
      </ImageBackground>
    </View>
  )
}

export default FloorPresenter
