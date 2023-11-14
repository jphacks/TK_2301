import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type FloorContextType = {
  showSurveyCard: boolean;
  setShowSurveyCard: React.Dispatch<React.SetStateAction<boolean>>;
  showItemCard: boolean;
  setShowItemCard: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: string | undefined;
  setItemId: React.Dispatch<React.SetStateAction<string | undefined>>;
  surveyedItems: string[];
  setSurveyedItems: React.Dispatch<React.SetStateAction<string[]>>;
};

const FloorContext = createContext<FloorContextType | undefined>(undefined);

export function useFloor() {
  const context = useContext(FloorContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export const FloorProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [showSurveyCard, setShowSurveyCard] = useState(false);
  const [showItemCard, setShowItemCard] = useState(false);
  const [itemId, setItemId] = useState<string>();
  const [surveyedItems, setSurveyedItems] = useState<string[]>([]);

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
        setSurveyedItems,
      }}>
      {children}
    </FloorContext.Provider>
  );
};
