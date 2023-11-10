// Firestoreに格納するデータの型
export type Scenario = {
  abstraction: Abstraction;
  characters: Character[];
  phases: Phase[];
  floorMaps: FloorMap[];
  items: Item[];
};

export type Abstraction = {
  title: string;
  outline: string;
  numberOfPlayers: number;
};

export type Character = {
  name: string;
  age: number;
  icon: any;
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
  category: string;
  description: string;
  coordinate: {
    x: number;
    y: number;
  };
};

export type Trick = {
  name: string;
  uncommonSense: string;
  principle: string;
  illusion: string;
};
