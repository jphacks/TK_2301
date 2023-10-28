import React, { useEffect, useState } from "react"
import AboutPresenter from "./presenters"
import { CharactersProps } from "../.."
import { useGame } from "../../game.context"

const About = ({ characters }: CharactersProps) => {
  const { myCharacter } = useGame()
  const [about, setAbout] = useState<string>("")

  useEffect(() => {
    if (myCharacter) {
      const character = characters.filter(
        (character) => character.nameKanji === myCharacter.characterName
      )[0]
      setAbout(character.about)
    }
  }, [])

  return <AboutPresenter about={about} />
}

export default About
