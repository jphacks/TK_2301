import React, {useState} from 'react';
import HintPresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';
import Create from 'agora-rn-uikit/src/Rtc/Create';

const Hint = () => {
  const [sendItems, setSendItems] = useState<string[]>([]);
  const [sendPhenomena, setSendPhenomena] = useState<string[]>([]);
  const {
    setPhase,
    setItemTricks,
    setTriviaTricks,
    shareJson,
    transitNextState,
    world,
    targetId,
  } = useCreateScenario();

  const addItem = (item: string) => {
    setSendItems([...sendItems, item]);
  };
  const addPhenomena = (phenomena: string) => {
    setSendPhenomena([...sendPhenomena, phenomena]);
  };

  const next = async () => {
    shareJson.item = sendItems;
    shareJson.trivia = sendPhenomena;
    const bodyData = JSON.stringify({
      world: world,
      item: sendItems,
      trivia: sendPhenomena,
    }).toString();
    const data = {
      user_input: `${bodyData}`,
    };

    const formResponse = await fetch('http://10.235.234.55:8080/test/trick', {
      method: 'POST', // HTTP-Methodを指定する！
      body: JSON.stringify(data), // リクエストボディーにフォームデータを設定
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = await formResponse.json();
    setItemTricks([...res.item]);
    setTriviaTricks([...res.trivia]);

    /*setTricks([
      {
        name: '滑落時にブレーキとして機能しないピッケル ',
        uncommonSense:
          '能力(ピッケルの効果を知っている登山者が滑落したと思わせるが、実は滑落しない) ピッケルの刃部分が折り畳み式であり、使い方を間違えると正しく機能しない。または、特定の素材の氷や雪ではピッケルが滑るような特殊なコーティングがされている。',
        principle: '',
        illusion: '',
      },
    ]);*/

    transitNextState(CreateState.Trick, targetId);
    setPhase(prev => prev + 1);
  };
  return <HintPresenter funcs={{addItem, addPhenomena}} next={next} />;
};

export default Hint;
