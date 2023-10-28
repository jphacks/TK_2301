import React, { useState } from "react"
import QuestionPresenter from "./presenter"
import { useFloor } from "../floor.context"

type Props = {
  itemId: number
}

const QuestionIcon = ({ itemId }: Props) => {
  const { showSurveyCard, setShowSurveyCard, setItemId } = useFloor()
  const [position, setPosition] = useState({
    top: Math.floor(Math.random() * (500 - 20 + 1)) + 20,
    left: Math.floor(Math.random() * (300 - 20 + 1)) + 20
  })

  const show = () => {
    setShowSurveyCard(true)
    setItemId(itemId)
  }

  const hide = () => {
    setShowSurveyCard(false)
  }
  return (
    <QuestionPresenter
      position={position}
      show={show}
      hide={hide}
      itemId={itemId}
    />
  )
}

export default QuestionIcon
