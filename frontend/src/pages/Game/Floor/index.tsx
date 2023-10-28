import React, { useState } from "react"
import FloorPresenter from "./presenter"
import { FloorProps } from "../FloorMap"
import { FloorProvider } from "./floor.context"

export type Props = {
  floor: FloorProps
  surveysCount: number
  minusSurveysCount: () => void
}

const Floor = ({ floor, surveysCount, minusSurveysCount }: Props) => {
  return (
    <FloorProvider>
      <FloorPresenter
        floor={floor}
        surveysCount={surveysCount}
        minusSurveysCount={minusSurveysCount}
      />
    </FloorProvider>
  )
}

export default Floor
