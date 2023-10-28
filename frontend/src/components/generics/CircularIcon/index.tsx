import React from "react"
import CircularIconPresenter from "./presenter"

type Props = {
  url: any
  styles?: any
}

const CircularIcon = ({ url, styles }: Props) => {
  return <CircularIconPresenter url={url} styles={styles} />
}

export default CircularIcon
