import React, {useState} from 'react';
import TrickSelectorPresenter from './presenter';
import {CharacterType, CreateState, useCreateScenario} from '../createScenario';
import {Trick} from '../../../models/scenario';
import AIserverInstance from '../../../api/server';

const TrickSelector = () => {
  const {
    setPhase,
    setTabId,
    transitNextState,
    setEditingCharacter,
    world,
    setItemImageCandidate,
    targetId,
  } = useCreateScenario();
  const [selectedItemTricks, setSelectedItemTricks] = useState<Trick[]>([]);
  const [selectedTriviaTricks, setSelectedTriviaTricks] = useState<Trick[]>([]);
  const {nowCharacterType, otherCharacters, setOtherCharacters, fetchDataFromServerWithInteract} = useCreateScenario();

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

    const res = await fetchDataFromServerWithInteract('test/criminal-character', data)

    res.id = targetId;
    res.icon = ''; // iconが返ってくるようになるまでの仮
    setEditingCharacter(res);
    setItemImageCandidate(res.item);

    setPhase(2);
    setTabId(1);

    console.log(targetId);
    if (nowCharacterType === CharacterType.Other) {
      otherCharacters.set(targetId || '', res);
      setOtherCharacters(otherCharacters);
      transitNextState(CreateState.OtherCharacter, targetId);
    } else {
      transitNextState(CreateState.CriminalsCharacter, targetId);
    }
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
