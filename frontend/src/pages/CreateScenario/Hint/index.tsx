import React, {useState} from 'react';
import HintPresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';
import Create from 'agora-rn-uikit/src/Rtc/Create';

const Hint = () => {
  const [sendItems, setSendItems] = useState<string[]>([]);
  const [sendPhenomena, setSendPhenomena] = useState<string[]>([]);
  const {setPhase, setTricks, shareJson, transitNextState} =
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

    /*const formResponse = await fetch(
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
    console.log(res.item);
    console.log(res.trivia);
    setTricks([...res.item, ...res.trivia]);*/

    setTricks([
      {
        name: '滑落時にブレーキとして機能しないピッケル ',
        uncommonSense:
          '能力(ピッケルの効果を知っている登山者が滑落したと思わせるが、実は滑落しない) ピッケルの刃部分が折り畳み式であり、使い方を間違えると正しく機能しない。または、特定の素材の氷や雪ではピッケルが滑るような特殊なコーティングがされている。',
        principle: '',
        illusion: '',
      },
    ]);

    transitNextState(CreateState.Trick);
    setPhase(prev => prev + 1);
  };
  return <HintPresenter funcs={{addItem, addPhenomena}} next={next} />;
};

export default Hint;
