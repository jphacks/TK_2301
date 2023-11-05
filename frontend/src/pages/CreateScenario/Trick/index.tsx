import React, {useState} from 'react';
import TrickPresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';

const Trick = () => {
  const {setPhase, setTabId, transitNextState, setEditingCharacter} =
    useCreateScenario();
  const [selectedTricks, setSelectedTricks] = useState<string[]>([]);
  const onPress = () => {
    // fetchする
    console.log(selectedTricks);

    setPhase(2);
    setTabId(1);

    transitNextState(CreateState.OtherCharacter);
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
