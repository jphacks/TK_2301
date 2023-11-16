import React from "react"
import ImpressionCardPresenter from "./presenter"

export type Props = {
  props: {
    icon: any
    name: string
    comment: string
  }
}

const ImpressionCard = ({ props }: Props) => {
  return <ImpressionCardPresenter props={props} />
}

export default ImpressionCard
