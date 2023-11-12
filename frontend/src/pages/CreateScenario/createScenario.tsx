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
  ItemImageCandidate,
  ImageType,
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

  targetId?: string;
  setTargetId: React.Dispatch<React.SetStateAction<string | undefined>>;

  targetImageURL: string;
  setTargetImageURL: React.Dispatch<React.SetStateAction<string>>;

  targetImageType: ImageType;
  setTargetImageType: React.Dispatch<React.SetStateAction<ImageType>>;

  phase: number;
  setPhase: React.Dispatch<React.SetStateAction<number>>;

  recievedItems: string[] | undefined;
  setRecievedItems: React.Dispatch<React.SetStateAction<string[] | undefined>>;

  recievedPhenomena: string[] | undefined;
  setRecievedPhenomena: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >;

  world: string;
  setWorld: React.Dispatch<React.SetStateAction<string>>;

  itemImageCandidate: ItemImageCandidate | undefined;
  setItemImageCandidate: React.Dispatch<
    React.SetStateAction<ItemImageCandidate | undefined>
  >;

  // ================================ 動的管理するシナリオデータ =============================
  // 新規作成のシナリオどうかのフラグを保持する
  isNewScenario: boolean;
  setIsNewScenario: React.Dispatch<React.SetStateAction<boolean>>;

  // シナリオID. Firestoreへの保存に用いる
  scenarioId: string;
  setScenarioId: React.Dispatch<React.SetStateAction<string>>;

  abstraction: Abstraction;
  setAbstraction: React.Dispatch<React.SetStateAction<Abstraction>>;

  // TODO: Map型への変換；　Characterとしてまとめても良いかも？
  criminal: Character;
  setCriminal: React.Dispatch<React.SetStateAction<Character>>;
  otherCharacters: Map<string, Character>;
  setOtherCharacters: React.Dispatch<
    React.SetStateAction<Map<string, Character>>
  >;

  floorMaps: Map<string, FloorMap>;
  setFloorMaps: React.Dispatch<React.SetStateAction<Map<string, FloorMap>>>;

  items: Map<string, Item>;
  setItems: React.Dispatch<React.SetStateAction<Map<string, Item>>>;

  // TODO: Map型への変換
  itemTricks: Trick[];
  setItemTricks: React.Dispatch<React.SetStateAction<Trick[]>>;

  triviaTricks: Trick[];
  setTriviaTricks: React.Dispatch<React.SetStateAction<Trick[]>>;

  // TODO: Map型への変換
  phenomena: string[];
  setPhenomena: React.Dispatch<React.SetStateAction<string[]>>;

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
  const [shareJson, setShareJson] = useState({});
  const [createState, setCreateState] = useState(CreateState.Default);
  const [pageStack, setPageStack] = useState([CreateState.Default]);
  const [editingCharacter, setEditingCharacter] = useState<Character>(
    sampleEditingCharacter,
  );
  const [nowCharacterType, setNowCharacterType] = useState(
    CharacterType.Default,
  );
  const [recievedItems, setRecievedItems] = useState<string[]>();
  const [recievedPhenomena, setRecievedPhenomena] = useState<string[]>();
  const [world, setWorld] = useState<string>('');

  const [itemImageCandidate, setItemImageCandidate] =
    useState<ItemImageCandidate>();

  // 編集対象となる要素のID, イメージの画像種類, URLを設定する変数。仮置き場的なレジスタとして扱って良い
  const [targetId, setTargetId] = useState<string | undefined>(undefined);
  const [targetImageType, setTargetImageType] = useState<ImageType>(
    ImageType.Default,
  );
  const [targetImageURL, setTargetImageURL] = useState<string>('');

  // ================================ 動的管理するシナリオデータState =============================
  const [criminal, setCriminal] = useState<Character>({
    name: '',
    id: '',
    icon: '',
    age: 0,
    profession: '',
    public_info: '',
    private_info: '',
    purpose: '',
    type: CharacterType.Criminal,
    timeline: [],
  });
  const [otherCharacters, setOtherCharacters] = useState<
    Map<string, Character>
  >(new Map());
  const [isNewScenario, setIsNewScenario] = useState<boolean>(false);
  const [scenarioId, setScenarioId] = useState<string>('');
  const [abstraction, setAbstraction] = useState<Abstraction>(sampleAbstract);
  const [items, setItems] = useState<Map<string, Item>>(clueItemsMap);
  const [floorMaps, setFloorMaps] = useState<Map<string, FloorMap>>(new Map());
  const [phenomena, setPhenomena] = useState<string[]>([]);
  const [itemTricks, setItemTricks] = useState<Trick[]>([]);
  const [triviaTricks, setTriviaTricks] = useState<Trick[]>([]);
  const [phaseData, setPhaseData] = useState<Map<string, Phase>>(
    new Map().set('xxxx', {
      name: '第１章 事件の始まり',
      phaseId: 'xxxx',
      numberOfSurveys: 2,
      timeLimit: 30,
    }),
  );

  // ================================ その他オリジナル関数 =============================
  // 第二引数は編集画面に遷移する際の対象要素の識別子
  const transitNextState = (createState: CreateState, targetId?: string) => {
    setTargetId(targetId || '');
    setTargetImageURL('');
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

  // Firebase Storageに保存されていない画像があれば保存し、URIを書き換える
  const preprocessItemsForUpload = async () => {
    const bufItem: Map<string, Item> = new Map(items);
    const bufItemArray: Item[] = Array.from(items.values());

    for (let i = 0; i < bufItemArray.length; i++) {
      const item = bufItemArray[i];

      // ローカルの画像で、まだFireStorageに保存されていない場合
      if (item.uri.startsWith('file://')) {
        const uploadPath = `items/${item.mapId}.png`;
        await storage().ref(uploadPath).putFile(item.uri, {
          contentType: 'image/png',
        });

        item.uri = uploadPath; // Firebaseに格納したURIで上書きする
      }

      bufItem.set(item.mapId, item);
    }

    setItems(bufItem);
  };

  const preprocessMapFloorForUpload = async () => {
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
  };

  const preprocessCharacterForUpload = async () => {
    const bufOther: Map<string, Character> = new Map(otherCharacters);
    const bufOtherArray: Character[] = Array.from(otherCharacters.values());

    // otherCharacters
    for (let i = 0; i < bufOtherArray.length; i++) {
      const character = bufOtherArray[i];

      // ローカルの画像で、まだFireStorageに保存されていない場合
      if (character.icon.startsWith('file://')) {
        console.log('yes');

        const uploadPath = `character_icons/${character.id}.png`;
        await storage().ref(uploadPath).putFile(character.icon, {
          contentType: 'image/png',
        });

        character.icon = uploadPath; // Firebaseに格納したURIで上書きする
      }

      bufOther.set(character.id, character);
    }

    // criminal
    console.log(criminal);
    if (criminal?.icon.startsWith('file://')) {
      console.log('yes');

      const uploadPath = `character_icons/${criminal.id}.png`;
      await storage().ref(uploadPath).putFile(criminal.icon, {
        contentType: 'image/png',
      });

      criminal.icon = uploadPath; // Firebaseに格納したURIで上書きする
    }

    setOtherCharacters(bufOther);
    setCriminal(criminal);
  };

  // ヘッダーのアップロードボタン押下時に発火
  const uploadScenarioData = async () => {
    await preprocessItemsForUpload();
    await preprocessMapFloorForUpload();
    await preprocessCharacterForUpload();

    const data: Scenario = {
      abstraction: abstraction,
      phases: Array.from(phaseData.values()),
      floorMaps: Array.from(floorMaps.values()),
      items: Array.from(items.values()),
      characters: [...Array.from(otherCharacters.values()), criminal], // TODO
    };

    // デバッグのためしばらく残しておく
    console.log('upload', data);

    if (isNewScenario) scenarioCollection.insert(scenarioId, data);
    else scenarioCollection.update(scenarioId, data);
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
        itemTricks,
        setItemTricks,
        triviaTricks,
        setTriviaTricks,
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
        recievedItems,
        setRecievedItems,
        recievedPhenomena,
        setRecievedPhenomena,
        world,
        setWorld,
        abstraction,
        setAbstraction,
        isNewScenario,
        setIsNewScenario,
        scenarioId,
        setScenarioId,
        itemImageCandidate,
        setItemImageCandidate,
        targetImageURL,
        setTargetImageURL,
        targetImageType,
        setTargetImageType,
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
