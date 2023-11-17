import React from "react"
import PurpleButtonPresenter from "./presenter"

export type Props = {
  title: string
  style?: any
  onClick?: () => void
}

const PurpleButton = ({ style, title, onClick }: Props) => {
  return (
    <PurpleButtonPresenter
      url={undefined}
      style={style}
      title={title}
      onClick={onClick}
    />
  )
}

export default PurpleButton
