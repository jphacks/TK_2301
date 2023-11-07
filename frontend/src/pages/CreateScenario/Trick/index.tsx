import React, {useState} from 'react';
import TrickPresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';

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
      name: '竹下波瑠',
      age: 52,
      profession: 'マジシャン',
      open: 'aaaaa',
      private: 'bbbbb',
      timeline: [
        {
          num: 0,
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
