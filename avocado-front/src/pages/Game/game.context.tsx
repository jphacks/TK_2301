import React, {ReactNode, createContext, useContext, useState} from 'react';
import auth from 'firebase/auth';
import {GameItem, Item} from '../../models/scenario';

type CharacterInfo = {
  characterName: string | null;
  uid: string | null;
};

type GameContextType = {
  myCharacter?: CharacterInfo;
  setMyCharacter: React.Dispatch<
    React.SetStateAction<CharacterInfo | undefined>
  >;
  selectedCharacters?: CharacterInfo[];
  setSelectedCharacters: React.Dispatch<React.SetStateAction<CharacterInfo[]>>;
  nowPhase: number;
  setNowPhase: React.Dispatch<React.SetStateAction<number>>;
  items: GameItem[];
  setItems: React.Dispatch<React.SetStateAction<GameItem[]>>;
  updateItems: (items: Item[]) => void;
  myItems: string[];
  setMyItems: React.Dispatch<React.SetStateAction<string[]>>;
  getItem: (item: string) => void;
  usersOnTheFloor: Map<string, string[]>;
  setUsersOnTheFloor: React.Dispatch<
    React.SetStateAction<Map<string, string[]>>
  >;
  votedCharacterName: string;
  setVotedCharacterName: React.Dispatch<React.SetStateAction<string>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export const GameProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [myCharacter, setMyCharacter] = useState<CharacterInfo>();
  const [selectedCharacters, setSelectedCharacters] = useState<CharacterInfo[]>(
    [],
  );
  const [items, setItems] = useState<GameItem[]>([
    {
      itemId: '1',
      name: 'test',
      uri: 'https://firebasestorage.googleapis.com/v0/b/mafia-4b0e3.appspot.com/o/characters%2Ftest.png?alt=media&token=5c6e1e2d-6a3a-4d7d-8a5b-3e0d7e9c8b9d',
      mapId: '1',
      isAvailable: true,
      category: 'item',
      description: 'test',
      coordinate: {
        x: 0,
        y: 0,
      },
    },
  ]);
  const [myItems, setMyItems] = useState<string[]>([]);
  const [nowPhase, setNowPhase] = useState(0); // タブバーの可視、不可視を管理するstate
  const [usersOnTheFloor, setUsersOnTheFloor] = useState<Map<string, string[]>>(
    new Map(),
  );
  const [votedCharacterName, setVotedCharacterName] = useState<string>('');

  const updateItems = (items: Item[]) => {
    const newItems: GameItem[] = [];
    items.map(item => {
      const newItem: GameItem = {
        ...item,
        isAvailable: true,
      };
      newItems.push(newItem);
    });
    setItems([...newItems]);
  };

  const getItem = (itemId: string) => {
    setMyItems(prev => [...prev, itemId]);
  };

  return (
    <GameContext.Provider
      value={{
        myCharacter,
        setMyCharacter,
        selectedCharacters,
        setSelectedCharacters,
        nowPhase,
        setNowPhase,
        items,
        setItems,
        updateItems,
        myItems,
        setMyItems,
        getItem,
        usersOnTheFloor,
        setUsersOnTheFloor,
        votedCharacterName,
        setVotedCharacterName,
      }}>
      {children}
    </GameContext.Provider>
  );
};
