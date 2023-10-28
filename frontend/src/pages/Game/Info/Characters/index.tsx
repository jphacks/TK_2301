import React from "react"
import CharactersPresenter from "./presenter"
import { CharactersProps } from "../.."

const Characters = ({ characters }: CharactersProps) => {
  return <CharactersPresenter characters={characters} />
}

export default Characters
