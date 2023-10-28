import React from "react"
import ItemCardPresenter from "./presenter"
import { useFloor } from "../floor.context"

export type Props = {
  item:
    | {
        id: number
        image: any
        name: string
        category: string
        description: string
      }
    | undefined
  minusSurveysCount: () => void
}

const ItemCard = ({ item, minusSurveysCount }: Props) => {
  const { setShowItemCard, setSurveyedItems } = useFloor()

  const get = () => {
    minusSurveysCount()
    setSurveyedItems((prev) => [...prev, item?.id as number])
    setShowItemCard(false)
  }
  const close = () => {
    setShowItemCard(false)
  }
  return (
    <ItemCardPresenter
      item={item}
      get={get}
      close={close}
      minusSurveysCount={minusSurveysCount}
    />
  )
}

export default ItemCard
