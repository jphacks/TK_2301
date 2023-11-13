import React, {useState} from 'react';
import TrickSelectorPresenter from './presenter';
import {CharacterType, CreateState, useCreateScenario} from '../createScenario';
import {Character, Trick} from '../../../models/scenario';
import AIserverInstance from '../../../api/server';
import uuid from 'react-native-uuid';

const TrickSelector = () => {
  const {
    setPhase,
    setTabId,
    transitNextState,
    setEditingCharacter,
    world,
    editingCharacter,
    setItemImageCandidate,
    targetId,
  } = useCreateScenario();
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

    const res = await AIserverInstance.fetch('test/criminal-character', data);
    const CastedData = {
      ...res,
      id: uuid.v4().toString(),
      characterType: CharacterType.Criminal,
      icon: '',
    };
    console.log('res', CastedData);

    // const test: Character = {
    //   id: '',
    //   name: '',
    //   age: 0,
    //   icon: '',
    //   profession: '',
    //   public_info: '',
    //   private_info: '',
    //   purpose: '',
    //   type: ,
    //   timeline: []
    // }

    res.id = targetId;
    res.icon = ''; // iconが返ってくるようになるまでの仮
    setEditingCharacter(CastedData);
    setItemImageCandidate(res.item);

    console.log(editingCharacter)

    setPhase(2);
    setTabId(1);

    console.log(targetId);
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
