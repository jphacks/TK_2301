import {Character, CharacterType, Item} from './scenario';

// Item のサンプル配列を作成します。
export const sampleClueItems: Item[] = [
  {
    itemId: 'item01',
    mapId: '1F',
    name: '血塗られたナイフ',
    uri: 'binary_data',
    category: 'Key',
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
    category: 'Key',
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
    category: 'Key',
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
  numberOfPlayers: 4,
};

export const sampleEditingCharacter: Character = {
  nameKanji: '山田太郎',
  nameKana: 'ヤマダタロウ',
  age: 30,
  icon: 'binary_data',
  profession: 'Detective',
  description: 'A sharp-witted detective with a keen eye for detail.',
  about: 'Known for solving several high-profile cases.',
  purpose: 'To find the truth behind the mysterious events at the mansion.',
  type: CharacterType.Criminal,
  timeline: [
    {
      text: '殺害。',
    },
  ],
};
