import React from "react"
import CharactersPresenter from "./presenter"

export type Props = {
  characters: {
    icon: any
    nameKanji: string
    nameKana: string
    age: number
    profession: string
    description: string
  }[]
}

const Characters = ({ characters }: Props) => {
  return <CharactersPresenter characters={characters} />
}

export default Characters
