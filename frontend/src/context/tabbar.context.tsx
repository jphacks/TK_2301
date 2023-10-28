import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"

type tabbarContextType = {
  isInfoVisible: boolean
  isChatVisible: boolean
  isSettingsVisible: boolean
  showInfo: boolean
  showChat: boolean
  showSettings: boolean
  setIsInfoVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsChatVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsSettingsVisible: React.Dispatch<React.SetStateAction<boolean>>
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>
}

const TabbarContext = createContext<tabbarContextType | undefined>(undefined)

export function useTabbar() {
  const context = useContext(TabbarContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export const TabbarProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false)
  const [isChatVisible, setIsChatVisible] = useState(false)
  const [isSettingsVisible, setIsSettingsVisible] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <TabbarContext.Provider
      value={{
        isInfoVisible,
        setIsInfoVisible,
        isChatVisible,
        setIsChatVisible,
        isSettingsVisible,
        setIsSettingsVisible,
        showInfo,
        setShowInfo,
        showChat,
        setShowChat,
        showSettings,
        setShowSettings
      }}
    >
      {children}
    </TabbarContext.Provider>
  )
}
