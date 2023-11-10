import React, {useState} from 'react';
import TrickSelectorPresenter from './presenter';
import {CharacterType, CreateState, useCreateScenario} from '../createScenario';
import {Trick} from '../../../models/scenario';

const TrickSelector = () => {
  const {setPhase, setTabId, transitNextState, setEditingCharacter, world} =
    useCreateScenario();
  const [selectedItemTricks, setSelectedItemTricks] = useState<Trick[]>([]);
  const [selectedTriviaTricks, setSelectedTriviaTricks] = useState<Trick[]>([]);

  const onPress = async () => {
    // fetchする
    const bodyData = JSON.stringify({
      world: world,
      item: selectedItemTricks,
      trivia: selectedTriviaTricks,
    }).toString();
    const data = {
      user_input: `${bodyData}`,
    };

    const formResponse = await fetch(
      'http://192.168.0.20:8080/test/criminal-character',
      {
        method: 'POST', // HTTP-Methodを指定する！
        body: JSON.stringify(data), // リクエストボディーにフォームデータを設定
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const res = await formResponse.json();
    console.log(res);

    setEditingCharacter(res);

    setPhase(2);
    setTabId(1);

    transitNextState(CreateState.OtherCharacter);
  };
  return (
    <TrickSelectorPresenter
      selectedItemTricks={selectedItemTricks}
      selectedTriviaTricks={selectedTriviaTricks}
      setSelectedItemTricks={setSelectedItemTricks}
      setSelectedTriviaTricks={setSelectedTriviaTricks}
      onPress={onPress}
    />
  );
};

export default TrickSelector;
