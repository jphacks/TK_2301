import React, {useState} from 'react';
import HintPresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';
import Create from 'agora-rn-uikit/src/Rtc/Create';
import AIserverInstance from '../../../api/server';

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
    
    console.log('hoge')
    const res = await AIserverInstance.fetch('test/trick/', data);

    setItemTricks([...res.item]);
    setTriviaTricks([...res.trivia]);

    setPhase(prev => prev + 1);
    transitNextState(CreateState.Trick, targetId);

  };
  return <HintPresenter funcs={{addItem, addPhenomena}} next={next} />;
};

export default Hint;
