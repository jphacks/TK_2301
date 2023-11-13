import {Character, CharacterType, Item} from './scenario';

// Item のサンプル配列を作成します。
export const sampleClueItems: Item[] = [
  {
    itemId: 'item01',
    mapId: '1F',
    name: '血塗られたナイフ',
    uri: 'binary_data',
    category: 'item',
    description: 'An old key that opens a mysterious door in the mansion.',
    coordinate: {
      x: -1,
      y: -1,
    },
  },
  {
    itemId: 'item02',
    mapId: '2F',
    name: '古びたキーボード',
    uri: 'binary_data',
    category: 'item',
    description: 'An old key that opens a mysterious door in the mansion.',
    coordinate: {
      x: -1,
      y: -1,
    },
  },
  {
    itemId: 'item03',
    mapId: '2F',
    name: '錆びた鍵',
    uri: 'binary_data',
    category: 'item',
    description: 'An old key that opens a mysterious door in the mansion.',
    coordinate: {
      x: -1,
      y: -1,
    },
  },
];

export const sampleAbstract = {
  title: 'おにぎり食べたの誰だ',
  outline: 'おにぎり食べられた',
  requiredTime: 10,
  numberOfPlayers: 4,
  thumbnail:
    'https://firebasestorage.googleapis.com/v0/b/avocado-test-5e236.appspot.com/o/thumbnail%2Fthunderstorm-3625405_1920.jpg?alt=media&token=c06ffad1-3eb3-4504-a538-62fd07d1e039',
};

export const sampleEditingCharacter: Character = {
  id: 'character01',
  name: '山田太郎',
  age: 30,
  icon: 'binary_data',
  profession: 'Detective',
  public_info: 'A sharp-witted detective with a keen eye for detail.',
  private_info: 'Known for solving several high-profile cases.',
  purpose: 'To find the truth behind the mysterious events at the mansion.',
  type: CharacterType.Criminal,
  timeline: [
    {
      num: 1,
      text: '殺害。',
    },
  ],
};
