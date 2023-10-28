import React, { useState } from "react"
import FloorMapPresenter from "./presenter"

export type FloorProps = {
  floorName: string
  background: any
  items: {
    id: number
    image: any
    name: string
    category: string
    description: string
  }[]
}

export type Props = {
  floorMap: FloorProps[]
  numberOfSurveys: number
}

const FloorMap = ({ floorMap, numberOfSurveys }: Props) => {
  const [isFloorEntered, setIsFloorEntered] = useState(false)
  const [floor, setFloor] = useState<FloorProps>()
  const [surveysCount, setSurveysCount] = useState(numberOfSurveys)
  const enter = (floorInfo: FloorProps) => {
    setFloor(floorInfo)
    setIsFloorEntered(true)
  }
  const exit = () => {
    console.log("exit")
    setIsFloorEntered(false)
    setFloor(undefined)
  }

  const minusSurveysCount = () => {
    setSurveysCount(surveysCount - 1)
  }
  return (
    <FloorMapPresenter
      floorMap={floorMap}
      enter={enter}
      isFloorEntered={isFloorEntered}
      floor={floor}
      exit={exit}
      surveysCount={surveysCount}
      numberOfSurveys={numberOfSurveys}
      minusSurveysCount={minusSurveysCount}
    />
  )
}

export default FloorMap
