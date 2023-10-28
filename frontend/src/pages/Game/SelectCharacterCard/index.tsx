import React, { useEffect } from "react"
import SelectCharacterCardPresenter from "./presenter"
import { useSocket } from "../../../context/socket.context"
import { useGame } from "../game.context"
import { useUser } from "../../../context/user.context"

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

const SelectCharacterCard = ({ character }: Props) => {
  const { socketRef } = useSocket()
  const { setMyCharacter, setSelectedCharacters } = useGame()
  const { user } = useUser()
  const onPress = (characterName: string) => {
    socketRef.current?.send(`/select ${characterName}`)
    const uid = user?.uid ?? null
    setMyCharacter({
      characterName,
      uid
    })
  }
  return (
    <SelectCharacterCardPresenter character={character} onPress={onPress} />
  )
}

export default SelectCharacterCard
