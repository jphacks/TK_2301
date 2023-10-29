import React, {useState} from 'react';
import WorldPresenter from './presenter';
import {useCreateScenario} from '../createScenario';
import {extractJson} from '../utility';

type Data = {item: string[]; trivia: string[]};

const World = () => {
  const dammyItems = [
    'クライミングハーネス',
    'ピッケル',
    'クライミングロープ',
    'テント',
  ];

  const dammyPhenomena = [
    '高所での気圧の変化による耳のポップ',
    '標高が高くなるにつれて気温が低下する',
    '高度が高くなると酸素濃度が低くなる',
  ];

  const {
    setIsWorld,
    setPhase,
    setIsHint,
    setItems,
    setPhenomena,
    setShareJson,
  } = useCreateScenario();
  const [worldItemText, setWorldItemText] = useState('');
  const onPress = (name: string) => {
    setWorldItemText(name);
  };
  const next = async () => {
    console.log('waiting');
    const data = {
      phase: 0,
      world: worldItemText,
    };
    // 3. Post通信
    const formResponse = await fetch(
      'https://dpdu6gddt5h6dqs24g2xnfv5240tvcjk.lambda-url.ap-northeast-1.on.aws/',
      {
        method: 'POST', // HTTP-Methodを指定する！
        body: JSON.stringify(data), // リクエストボディーにフォームデータを設定
      },
    );
    console.log(formResponse);
    const res = await formResponse.json();
    console.log(res);
    const resData = extractJson(res);
    const castedData = resData as Data;
    setShareJson(castedData);
    console.log(castedData.item);
    // ここでfetchして、itemsとphenomenaを更新する(今はダミー)
    setItems(castedData.item);
    setPhenomena(castedData.trivia);
    setIsWorld(false);
    setIsHint(true);
    setPhase(prev => prev + 1);
  };
  return <WorldPresenter onPress={onPress} next={next} value={worldItemText} />;
};

export default World;
