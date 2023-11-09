import React, {useState} from 'react';
import TrickPresenter from './presenter';
import {CharacterType, CreateState, useCreateScenario} from '../createScenario';

const Trick = () => {
  const {setPhase, setTabId, transitNextState, setEditingCharacter} =
    useCreateScenario();
  const [selectedTricks, setSelectedTricks] = useState<string[]>([]);
  const onPress = () => {
    // fetchする

    setPhase(2);
    setTabId(1);

    transitNextState(CreateState.OtherCharacter);

    setEditingCharacter({
      nameKanji: '竹下波瑠',
      nameKana: 'たけしたはる',
      age: 52,
      icon: 'binary_data',
      profession: 'マジシャン',
      description: 'aaaaa',
      about: 'bbbbb',
      type: CharacterType.Criminal,
      timeline: [
        {
          text: 'aaaaaa',
        },
      ],
      purpose: 'bbbbbb',
    });
  };
  return (
    <TrickPresenter
      selectedTricks={selectedTricks}
      setSelectedTricks={setSelectedTricks}
      onPress={onPress}
    />
  );
};

export default Trick;
