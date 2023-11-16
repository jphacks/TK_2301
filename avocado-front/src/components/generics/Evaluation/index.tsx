import React from "react"
import EvaluationPresenter from "./presenter"

type Props = {
  rating: number
}

const Evaluation = ({ rating }: Props) => {
  const filledStars = Math.floor(rating)
  const halfStars = rating % 1 >= 0.5 ? 1 : 0
  return <EvaluationPresenter filledStars={filledStars} halfStars={halfStars} />
}

export default Evaluation
