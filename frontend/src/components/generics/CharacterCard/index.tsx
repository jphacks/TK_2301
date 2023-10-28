import React from "react"
import CharacterCardPresenter from "./presenter"

export type Props = {
  character: {
    icon: any
    nameKanji: string
    nameKana: string
    age: number
    profession: string
    description: string
  }
}

const CharacterCard = ({ character }: Props) => {
  return <CharacterCardPresenter character={character} />
}

export default CharacterCard
