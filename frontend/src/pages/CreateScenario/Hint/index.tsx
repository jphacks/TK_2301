import React, {useState} from 'react';
import HintPresenter from './presenter';
import {useCreateScenario} from '../createScenario';

const Hint = () => {
  const [sendItems, setSendItems] = useState<string[]>([]);
  const [sendPhenomena, setSendPhenomena] = useState<string[]>([]);
  const {setIsHint, setPhase, setIsTrick, setTricks, shareJson} =
    useCreateScenario();

  const addItem = (item: string) => {
    setSendItems([...sendItems, item]);
  };
  const addPhenomena = (phenomena: string) => {
    setSendPhenomena([...sendPhenomena, phenomena]);
  };

  const next = async () => {
    console.log(sendItems);
    console.log(sendPhenomena);

    shareJson.item = sendItems;
    shareJson.trivia = sendPhenomena;
    console.log(shareJson);
    const data = {
      phase: 1,
      context1: shareJson,
    };

    const formResponse = await fetch(
      'https://dpdu6gddt5h6dqs24g2xnfv5240tvcjk.lambda-url.ap-northeast-1.on.aws/',
      {
        method: 'POST', // HTTP-Methodを指定する！
        body: JSON.stringify(data), // リクエストボディーにフォームデータを設定
      },
    );

    const res = await formResponse.json();
    console.log(res);

    // ここでfetchして、itemsとphenomenaを送る(今はダミー)
    // tricksも受け取るけど、今はダミー(型もテキトー)
    setTricks([
      {
        a: '滑落時にブレーキとして機能しないピッケル ',
        b: '能力(ピッケルの効果を知っている登山者が滑落したと思わせるが、実は滑落しない) ピッケルの刃部分が折り畳み式であり、使い方を間違えると正しく機能しない。または、特定の素材の氷や雪ではピッケルが滑るような特殊なコーティングがされている。',
      },
      {
        a: '土が雨で強固になり、崩れにくくなる 錯覚させる',
        b: '移動性(通るのが不可と思われた道を通ることができる) 。 地下にある特殊な鉱石が雨水と反応して固化作用を持つ。この鉱石が含まれる地域では雨が降ると土砂崩れのリスクが減少する。',
      },
      {
        a: 'ホワイトアウトが発生しても視界が全く低下しない',
        b: '特定の視界補助装置(例:高度なAR技術を利用したゴーグル)を使用することで、周囲の景色や人々の位置をリアルタイムで映し出す。能力(ホワイトアウト中にも他の人たちとは違う動きをすることができ、それを利用して事件を起こすやアリバイを作る)',
      },
    ]);

    /*setIsHint(false);
    setIsTrick(true);
    setPhase(prev => prev + 1);*/
  };
  return <HintPresenter funcs={{addItem, addPhenomena}} next={next} />;
};

export default Hint;
