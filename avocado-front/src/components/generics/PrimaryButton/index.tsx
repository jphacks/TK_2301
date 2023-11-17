import React from "react"
import PrimaryButtonPresenter from "./presenter"

export type Props = {
  onPress: () => void
  text: string
  width?: number
  style?: any
}

const PrimaryButton = ({ onPress, text, width, style }: Props) => {
  return <PrimaryButtonPresenter onPress={onPress} text={text} width={width} style={style} />
}

export default PrimaryButton
