import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"

type FloorContextType = {
  showSurveyCard: boolean
  setShowSurveyCard: React.Dispatch<React.SetStateAction<boolean>>
  showItemCard: boolean
  setShowItemCard: React.Dispatch<React.SetStateAction<boolean>>
  itemId: number | undefined
  setItemId: React.Dispatch<React.SetStateAction<number | undefined>>
  surveyedItems: number[]
  setSurveyedItems: React.Dispatch<React.SetStateAction<number[]>>
}

const FloorContext = createContext<FloorContextType | undefined>(undefined)

export function useFloor() {
  const context = useContext(FloorContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export const FloorProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [showSurveyCard, setShowSurveyCard] = useState(false)
  const [showItemCard, setShowItemCard] = useState(false)
  const [itemId, setItemId] = useState<number>()
  const [surveyedItems, setSurveyedItems] = useState<number[]>([])

  return (
    <FloorContext.Provider
      value={{
        showSurveyCard,
        setShowSurveyCard,
        showItemCard,
        setShowItemCard,
        itemId,
        setItemId,
        surveyedItems,
        setSurveyedItems
      }}
    >
      {children}
    </FloorContext.Provider>
  )
}
