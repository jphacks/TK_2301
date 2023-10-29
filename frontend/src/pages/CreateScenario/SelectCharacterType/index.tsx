import React from 'react';
import SelectCharacterTypePresenter from './presenter';
import {useCreateScenario} from '../createScenario';

const SelectCharacterType = () => {
  const {setIsCreatingCharacter, setIsOther, setPhase, phase} =
    useCreateScenario();
  const onPress = (type: string) => {
    if (type === 'criminal') {
      setIsCreatingCharacter(true);
      setPhase(prev => prev + 1);
    } else if (type === 'other') {
      setIsCreatingCharacter(true);
      setIsOther(true);
    }
  };
  return <SelectCharacterTypePresenter onPress={onPress} />;
};

export default SelectCharacterType;
