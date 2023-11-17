import React from "react"
import InteractiveCircularIconPresenter from "./presenter"

type Props = {
  url: any
  name: string
}

const InteractiveCircularIcon = ({ url, name }: Props) => {
  return (
    <>
      <InteractiveCircularIconPresenter url={url} name={name} />
    </>
  )
}

export default InteractiveCircularIcon
