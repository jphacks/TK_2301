import React from "react"
import SamplePresenter from "./presenter"

export type Props = {
  test: string
}

const Sample = ({ test }: Props) => {
  return <SamplePresenter test={test} url={undefined} />
}

export default Sample
