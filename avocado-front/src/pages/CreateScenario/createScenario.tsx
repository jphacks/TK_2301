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
  Ending,
} from '../../models/scenario';
import {
  emptyAbstract,
  sampleAbstract,
  sampleClueItems,
} from '../../models/samples';
import {createScenarioFirestore} from '../../api/firebase/firestore';
import {getStorage, ref as storageRef, uploadBytes} from 'firebase/storage';
import AIserverInstance from '../../api/server';

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
  EndingContent,
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
  setEditingCharacter: React.Dispatch<
    React.SetStateAction<Character | undefined>
  >;

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

  // サーバとのやり取り中、ロード画面を表示させるために使う
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;

  // サーバとのやり取り中、ロード画面を表示させるために使う
  isCompleteUpload: boolean;
  setIsCompleteUpload: React.Dispatch<React.SetStateAction<boolean>>;

  // サーバとのやり取り中、ロード画面を表示させるために使う
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;

  // サーバとのやり取り中、ロード画面を表示させるために使う
  isConfirm: boolean;
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;

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

  endings: Map<string, Ending>;
  setEndings: React.Dispatch<React.SetStateAction<Map<string, Ending>>>;

  // ================================ その他オリジナル関数 =============================
  transitNextState: (createState: CreateState, targetId?: string) => void;
  transitPrevState: () => void;
  uploadScenarioData: () => void;
  fetchDataFromServerWithInteract: (
    endpoint: string,
    data: any,
  ) => Promise<any>;
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
  const [editingCharacter, setEditingCharacter] = useState<Character>();
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
  const [isFetching, setIsFetching] = useState<boolean>(false); // 生成中モーダル表示のために用いる
  const [isUploading, setIsUploading] = useState<boolean>(false); // TODO: 保存中モーダル表示のために用いる
  const [isCompleteUpload, setIsCompleteUpload] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const openConfirmModal = () => setIsConfirm(true);
  const closeConfirmModal = () => setIsConfirm(false);

  const openFetchingModal = () => setIsFetching(true);
  const closeFetchingModal = () => setIsFetching(false);

  const openUploadingModal = () => setIsUploading(true);
  const closeUploadingModal = () => setIsUploading(false);

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
  const [abstraction, setAbstraction] = useState<Abstraction>(emptyAbstract);
  const [items, setItems] = useState<Map<string, Item>>(new Map());
  const [floorMaps, setFloorMaps] = useState<Map<string, FloorMap>>(new Map());
  const [phenomena, setPhenomena] = useState<string[]>([]);
  const [itemTricks, setItemTricks] = useState<Trick[]>([]);
  const [triviaTricks, setTriviaTricks] = useState<Trick[]>([]);
  const [phaseData, setPhaseData] = useState<Map<string, Phase>>(
    new Map().set('xxxx', {
      name: '第１章 事件の始まり',
      phaseId: 'xxxx',
      numberOfSurveys: 2,
      timeLimit: 15,
    }),
  );
  const [endings, setEndings] = useState<Map<string, Ending>>(new Map());

  // ================================ その他オリジナル関数 =============================
  // 第二引数は編集画面に遷移する際の対象要素の識別子
  const transitNextState = (createState: CreateState, targetId?: string) => {
    console.log('next', targetId);
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

  // UI制御も兼ねた、データフェッチ関数
  const fetchDataFromServerWithInteract = async (
    endpoint: string,
    data: any,
  ): Promise<any> => {
    setIsFetching(true); // 生成中モーダルON
    const res = await AIserverInstance.fetch(endpoint, data);
    setIsFetching(false); // 生成中モーダルOFF

    return res;
  };

  // Firebase Storageに保存されていない画像があれば保存し、URLを書き換える
  const preprocessItemsForUpload = async () => {
    const bufItem: Map<string, Item> = new Map(items);
    const bufItemArray: Item[] = Array.from(items.values());
    const storage = getStorage();
    const scenarioFirestore = createScenarioFirestore();

    for (let i = 0; i < bufItemArray.length; i++) {
      const item = bufItemArray[i];

      // ローカルの画像で、まだFireStorageに保存されていない場合
      if (item.uri.startsWith('file://')) {
        const uploadPath = `items/${item.itemId}.png`;
        const file = await fetch(item.uri).then(r => r.blob()); // ローカルファイルを Blob に変換
        const storageReference = storageRef(storage, uploadPath);

        await uploadBytes(storageReference, file, {
          contentType: 'image/png',
        });

        item.uri = await scenarioFirestore.getImageUrl(uploadPath); // Firebaseに格納したURLで上書きする
      }

      bufItem.set(item.itemId, item);
    }

    setItems(bufItem);
  };

  const preprocessMapFloorForUpload = async () => {
    const bufFloorMaps: Map<string, FloorMap> = new Map(floorMaps);
    const bufFloorArray: FloorMap[] = Array.from(floorMaps.values());
    const storage = getStorage();
    const scenarioFirestore = createScenarioFirestore();

    for (let i = 0; i < bufFloorArray.length; i++) {
      const map = bufFloorArray[i];

      // ローカルの画像で、まだFireStorageに保存されていない場合
      if (map.uri.startsWith('file://')) {
        const uploadPath = `floor_maps/${map.mapId}.png`;
        const file = await fetch(map.uri).then(r => r.blob()); // ローカルファイルを Blob に変換
        const storageReference = storageRef(storage, uploadPath);
        await uploadBytes(storageReference, file, {
          contentType: 'image/png',
        });

        map.uri = await scenarioFirestore.getImageUrl(uploadPath); // Firebaseに格納したURLで上書きする
      }

      bufFloorMaps.set(map.mapId, map);
    }

    setFloorMaps(bufFloorMaps);
  };

  const preprocessCharacterForUpload = async () => {
    const bufOther: Map<string, Character> = new Map(otherCharacters);
    const bufOtherArray: Character[] = Array.from(otherCharacters.values());
    const storage = getStorage();
    const scenarioFirestore = createScenarioFirestore();

    // otherCharacters
    for (let i = 0; i < bufOtherArray.length; i++) {
      const character = bufOtherArray[i];

      // ローカルの画像で、まだFireStorageに保存されていない場合
      if (character.icon.startsWith('file://')) {
        const uploadPath = `character_icons/${character.id}.png`;
        const file = await fetch(character.icon).then(r => r.blob()); // ローカルファイルを Blob に変換
        const storageReference = storageRef(storage, uploadPath);
        await uploadBytes(storageReference, file, {
          contentType: 'image/png',
        });

        character.icon = await scenarioFirestore.getImageUrl(uploadPath); // Firebaseに格納したURLで上書きする
      }

      bufOther.set(character.id, character);
    }

    // criminal
    console.log(criminal);
    if (criminal?.icon.startsWith('file://')) {
      const uploadPath = `character_icons/${criminal.id}.png`;
      const file = await fetch(criminal?.icon).then(r => r.blob()); // ローカルファイルを Blob に変換
      const storageReference = storageRef(storage, uploadPath);
      await uploadBytes(storageReference, file, {
        contentType: 'image/png',
      });

      criminal.icon = uploadPath; // Firebaseに格納したURLで上書きする
    }

    setOtherCharacters(bufOther);
    setCriminal(criminal);
  };

  const preprocessAbstractionForUpload = async () => {
    const storage = getStorage();
    const scenarioFirestore = createScenarioFirestore();

    if (abstraction?.thumbnail.startsWith('file://')) {
      const uploadPath = `thumbnail/${scenarioId}.png`;
      const file = await fetch(abstraction.thumbnail).then(r => r.blob()); // ローカルファイルを Blob に変換
      const storageReference = storageRef(storage, uploadPath);
      await uploadBytes(storageReference, file, {
        contentType: 'image/png',
      });

      setAbstraction({
        ...abstraction,
        thumbnail: await scenarioFirestore.getImageUrl(uploadPath),
      });
    }
  };

  // ヘッダーのアップロードボタン押下時に発火
  const uploadScenarioData = async () => {
    openUploadingModal();
    closeConfirmModal();

    await preprocessItemsForUpload();
    await preprocessMapFloorForUpload();
    await preprocessCharacterForUpload();
    await preprocessAbstractionForUpload();

    console.log(abstraction);

    const data: Scenario = {
      abstraction: abstraction,
      phases: Array.from(phaseData.values()),
      floorMaps: Array.from(floorMaps.values()),
      items: [...Array.from(items.values())],
      characters: [...Array.from(otherCharacters.values()), criminal], // TODO
    };

    // デバッグのためしばらく残しておく
    console.log('upload', data);

    closeUploadingModal();

    if (isNewScenario) {
      createScenarioFirestore().insert(scenarioId, data);
      setIsNewScenario(false);
    } else createScenarioFirestore().update(scenarioId, data);

    setIsCompleteUpload(true);
    console.log('complete upload');
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
        isFetching,
        setIsFetching,
        fetchDataFromServerWithInteract,
        isUploading,
        setIsUploading,
        isConfirm,
        setIsConfirm,
        isCompleteUpload,
        setIsCompleteUpload,
        endings,
        setEndings,
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
