import React, {useState} from 'react';
import WorldPresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';
import {extractJson} from '../utility';
import AIserverInstance from '../../../api/server';

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
    fetchDataFromServerWithInteract,
  } = useCreateScenario();
  const onPress = (name: string) => {
    setWorld(name);
  };
  const next = async () => {
    const data = {
      user_input: world,
    };

    const res = await fetchDataFromServerWithInteract(
      'test/item-and-trivia/',
      data,
    );

    const castedData = res as Data;
    setShareJson(castedData);
    setRecievedItems(castedData.item);
    setRecievedPhenomena(castedData.trivia);

    console.log(targetId);
    transitNextState(CreateState.Hint, targetId);
    setPhase(prev => prev + 1);
  };
  return <WorldPresenter onPress={onPress} next={next} value={world} />;
};

export default World;
