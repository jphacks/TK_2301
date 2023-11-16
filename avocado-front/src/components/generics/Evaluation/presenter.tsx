import React from "react"
import { View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import styles from "./style"

type Props = {
  filledStars: number
  halfStars: number
}

const EvaluationPresenter = ({ filledStars, halfStars }: Props) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }).map((_, index) => {
        if (index < filledStars) {
          return <Icon key={index} name="star" size={12} color="#FFC148" />
        } else if (index === filledStars && halfStars) {
          return (
            <Icon key={index} name="star-half-o" size={12} color="#FFC148" />
          )
        }
        return <Icon key={index} name="star" size={12} color="#BDBDBD" />
      })}
    </View>
  )
}

export default EvaluationPresenter
