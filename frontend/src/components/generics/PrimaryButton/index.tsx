import React from "react"
import PrimaryButtonPresenter from "./presenter"

export type Props = {
  onPress: () => void
  text: string
  width?: number
}

const PrimaryButton = ({ onPress, text, width }: Props) => {
  return <PrimaryButtonPresenter onPress={onPress} text={text} width={width} />
}

export default PrimaryButton
