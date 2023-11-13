import React, {useState} from 'react';
import WorldPresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';
import {extractJson} from '../utility';

type Data = {item: string[]; trivia: string[]; world: string};

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
    setPhase,
    setRecievedItems,
    setRecievedPhenomena,
    setShareJson,
    transitNextState,
    world,
    setWorld,
    targetId,
  } = useCreateScenario();
  const onPress = (name: string) => {
    setWorld(name);
  };
  const next = async () => {
    console.log('waiting');
    const data = {
      user_input: world,
    };

    // Post通信
    const formResponse = await fetch(
      'http://172.31.17.121:8080/test/item-and-trivia/',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const res = await formResponse.json();
    const castedData = res as Data;
    setShareJson(castedData);
    setRecievedItems(castedData.item);
    setRecievedPhenomena(castedData.trivia);

    /*setItems(dammyItems);
    setPhenomena(dammyPhenomena);*/

    console.log(targetId);
    transitNextState(CreateState.Hint, targetId);
    setPhase(prev => prev + 1);
  };
  return <WorldPresenter onPress={onPress} next={next} value={world} />;
};

export default World;
