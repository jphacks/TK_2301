import React, {ReactNode, createContext, useContext, useState} from 'react';
import {
  Character,
  Item,
  FloorMap,
  CharacterType,
  Scenario,
  Abstraction,
  Trick,
  Phase,
} from '../../models/scenario';
import {
  sampleAbstract,
  sampleClueItems,
  sampleEditingCharacter,
} from '../../models/samples';
import scenarioCollection from '../../api/firebase/firestore';
import storage from '@react-native-firebase/storage';

export enum CreateState {
  Default,
  CriminalsCharacter,
  OtherCharacter,
  ItemInfo,
  World,
  Hint,
  Trick,
  Image,
  Room,
  Phase,
}

const clueItemsMap = new Map<string, Item>();

type CreateScenarioContextType = {
  // ================================ UI制御に必要な情報 =============================
  tabId: number;
  setTabId: React.Dispatch<React.SetStateAction<number>>;

  createState: CreateState;
  setCreateState: React.Dispatch<React.SetStateAction<CreateState>>;

  pageStack: CreateState[];
  setPageStack: React.Dispatch<React.SetStateAction<CreateState[]>>;

  editingCharacter: Character | undefined;
  setEditingCharacter: React.Dispatch<React.SetStateAction<Character>>;

  shareJson: any;
  setShareJson: React.Dispatch<React.SetStateAction<any>>;

  nowCharacterType: CharacterType;
  setNowCharacterType: React.Dispatch<React.SetStateAction<CharacterType>>;

  targetId?: number | string;
  setTargetId: React.Dispatch<
    React.SetStateAction<number | string | undefined>
  >;

  phase: number;
  setPhase: React.Dispatch<React.SetStateAction<number>>;

  // ================================ 動的管理するシナリオデータ =============================
  // TODO: Map型への変換；　Characterとしてまとめても良いかも？
  criminal: Character | undefined;
  setCriminal: React.Dispatch<React.SetStateAction<Character | undefined>>;
  otherCharacters: Character[];
  setOtherCharacters: React.Dispatch<React.SetStateAction<Character[]>>;

  floorMaps: Map<string, FloorMap>;
  setFloorMaps: React.Dispatch<React.SetStateAction<Map<string, FloorMap>>>;

  items: Map<string, Item>;
  setItems: React.Dispatch<React.SetStateAction<Map<string, Item>>>;

  // TODO: Map型への変換
  tricks: Trick[];
  setTricks: React.Dispatch<React.SetStateAction<Trick[]>>;

  // TODO: Map型への変換
  phenomena: string[];
  setPhenomena: React.Dispatch<React.SetStateAction<string[]>>;

  // TODO: Map型への変換
  phaseData: Map<string, Phase>;
  setPhaseData: React.Dispatch<React.SetStateAction<Map<string, Phase>>>;

  // ================================ その他オリジナル関数 =============================
  transitNextState: (createState: CreateState, targetId?: string) => void;
  transitPrevState: () => void;
  uploadScenarioData: () => void;
};

export const CreateScenarioProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  sampleClueItems.forEach(item => {
    clueItemsMap.set(item.itemId, item);
  });

  // ================================ UI制御に必要なState =============================
  const [tabId, setTabId] = useState<number>(1);
  const [phase, setPhase] = useState<number>(1);
  const [abstraction, setAbstraction] = useState<Abstraction>(sampleAbstract);
  const [shareJson, setShareJson] = useState({});
  const [createState, setCreateState] = useState(CreateState.Default);
  const [pageStack, setPageStack] = useState([CreateState.Default]);
  const [editingCharacter, setEditingCharacter] = useState<Character>(
    sampleEditingCharacter,
  );
  const [nowCharacterType, setNowCharacterType] = useState(
    CharacterType.Default,
  );

  // 編集対象となる要素のID等を設定する変数。仮置き場的なレジスタとして扱って良い
  const [targetId, setTargetId] = useState<number | string | undefined>(
    undefined,
  );

  // ================================ 動的管理するシナリオデータState =============================
  const [criminal, setCriminal] = useState<Character>();
  const [otherCharacters, setOtherCharacters] = useState<Character[]>([]);
  const [items, setItems] = useState<Map<string, Item>>(clueItemsMap);
  const [floorMaps, setFloorMaps] = useState<Map<string, FloorMap>>(new Map());
  const [phenomena, setPhenomena] = useState<string[]>([]);
  const [tricks, setTricks] = useState<
    {
      name: string;
      uncommonSense: string;
      principle: string;
      illusion: string;
    }[]
  >([]);
  const [phaseData, setPhaseData] = useState<Map<string, Phase>>(new Map());

  // ================================ その他オリジナル関数 =============================
  // 第二引数は編集画面に遷移する際の対象要素の識別子
  const transitNextState = (createState: CreateState, targetId?: string) => {
    setTargetId(targetId);
    setPageStack([...pageStack, createState]);
    setCreateState(createState);
  };

  // ヘッダーの戻るボタン押下時に発火
  const transitPrevState = () => {
    const bufStack: CreateState[] = [...pageStack];

    bufStack.pop();
    setPageStack([...bufStack]); // NOTE: ディープコピーにすることで後述の副作用を回避

    setCreateState(bufStack.pop() || CreateState.Default);
  };

  // ヘッダーのアップロードボタン押下時に発火
  const uploadScenarioData = async () => {
    const bufFloorMaps: Map<string, FloorMap> = new Map(floorMaps);
    const bufFloorArray: FloorMap[] = Array.from(floorMaps.values());

    for (let i = 0; i < bufFloorArray.length; i++) {
      const map = bufFloorArray[i];

      // ローカルの画像で、まだFireStorageに保存されていない場合
      if (map.uri.startsWith('file://')) {
        console.log('yes');

        const uploadPath = `floor_maps/${map.mapId}.png`;
        await storage().ref(uploadPath).putFile(map.uri, {
          contentType: 'image/png',
        });

        map.uri = uploadPath; // Firebaseに格納したURIで上書きする
      }

      bufFloorMaps.set(map.mapId, map);
    }

    setFloorMaps(bufFloorMaps);

    const data: Scenario = {
      abstraction: abstraction,
      phases: [], // TODO
      floorMaps: Array.from(floorMaps.values()),
      items: Array.from(items.values()),
      characters: [], // TODO
    };

    console.log(data);

    scenarioCollection.update('UA7B967KQVB4kXCMjt2t', data);
  };

  return (
    <CreateScenarioContext.Provider
      value={{
        tabId,
        setTabId,
        phase,
        setPhase,
        criminal,
        setCriminal,
        otherCharacters,
        setOtherCharacters,
        items,
        setItems,
        phenomena,
        setPhenomena,
        tricks,
        setTricks,
        editingCharacter,
        setEditingCharacter,
        shareJson,
        setShareJson,
        createState,
        setCreateState,
        pageStack,
        setPageStack,
        transitNextState,
        transitPrevState,
        nowCharacterType,
        setNowCharacterType,
        floorMaps,
        setFloorMaps,
        targetId,
        setTargetId,
        uploadScenarioData,
        phaseData,
        setPhaseData,
      }}>
      {children}
    </CreateScenarioContext.Provider>
  );
};

const CreateScenarioContext = createContext<
  CreateScenarioContextType | undefined
>(undefined);

export function useCreateScenario() {
  const context = useContext(CreateScenarioContext);
  if (!context) {
    throw new Error(
      'useCreateScenario must be used within a CreateScenarioProvider',
    );
  }
  return context;
}

export {CharacterType};
