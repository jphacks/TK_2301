import React, { ReactNode, createContext, useContext, useState } from "react"
import auth from "firebase/auth"

type CharacterInfo = {
  characterName: string | null
  uid: string | null
}

type GameContextType = {
  myCharacter?: CharacterInfo
  setMyCharacter: React.Dispatch<
    React.SetStateAction<CharacterInfo | undefined>
  >
  selectedCharacters?: CharacterInfo[]
  setSelectedCharacters: React.Dispatch<
    React.SetStateAction<CharacterInfo[] | undefined>
  >
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [myCharacter, setMyCharacter] = useState<CharacterInfo>()
  const [selectedCharacters, setSelectedCharacters] =
    useState<CharacterInfo[]>()

  return (
    <GameContext.Provider
      value={{
        myCharacter,
        setMyCharacter,
        selectedCharacters,
        setSelectedCharacters
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
