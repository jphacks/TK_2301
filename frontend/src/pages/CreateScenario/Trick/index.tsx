import React, {useState} from 'react';
import TrickPresenter from './presenter';
import {Text, View} from 'react-native';
import {useCreateScenario} from '../createScenario';

const Trick = () => {
  const {setPhase, setTabId, setIsTrick, setIsCreatingCharacter} =
    useCreateScenario();
  const [selectedTricks, setSelectedTricks] = useState<string[]>([]);
  const onPress = () => {
    // fetchする
    console.log(selectedTricks);

    setPhase(2);
    setTabId(1);
    setIsTrick(false);
    setIsCreatingCharacter(true);
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
