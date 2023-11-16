import React from "react"
import PurpleCheckIconPresenter from "./presenter"

export type Props = {
  isChecked: boolean
}

const PurpleCheckIcon = ({ isChecked }: Props) => {
  return < PurpleCheckIconPresenter isChecked={isChecked} />
}

export default PurpleCheckIcon 
