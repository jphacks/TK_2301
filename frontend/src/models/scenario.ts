
// Firestoreに格納するデータの型
export type Scenario = {
  abstraction: Abstraction;
  characters: Character[];
  phases: Phase[];
  floorMaps: FloorMap[];
  items: Item[];
  endings?: Ending[];
};

export type Abstraction = {
  title: string;
  outline: string;
  requiredTime: number;
  numberOfPlayers: number;
  thumbnail: string;
};

export type Character = {
  id: string;
  name: string;
  age: number;
  icon: string;
  profession: string;
  public_info: string;
  private_info: string;
  purpose: string;
  type: CharacterType;
  timeline: {
    num: number;
    text: string;
  }[];
};

export type Serif = {
  character: Character;
  isStoryTeller?: boolean; // 語り部かどうか
  textContent: string; 
}

export type Ending = {
  character: Character;
  storySerifLine: Serif[];
  outline: string;
}

export enum CharacterType {
  Default,
  Criminal,
  Other,
}

export type FloorMap = {
  mapId: string;
  name: string;
  uri: string;
};

export type Phase = {
  phaseId: string;
  name: string;
  numberOfSurveys: number;
  timeLimit: number;
};

export type Item = {
  itemId: string;
  mapId: string; // 配置するマップID
  name: string;
  uri: string;
  category: ItemCategory;
  description: string;
  coordinate: {
    x: number;
    y: number;
  };
};

export type GameItem = {
  isAvailable: boolean;
} & Item;

export type ItemCategory = '' | 'item' | 'info';

export type Trick = {
  name: string;
  uncommonSense: string;
  principle: string;
  illusion: string;
};

export enum ImageType {
  Default,
  Character,
  FloorMap,
  Item,
}

export type ItemImageCandidate = {
  name: string;
  image: string[];
};
