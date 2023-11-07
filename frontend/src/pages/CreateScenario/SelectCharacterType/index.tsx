import React from 'react';
import SelectCharacterTypePresenter from './presenter';
import {CreateState, CharacterType, useCreateScenario} from '../createScenario';

const SelectCharacterType = () => {
  const {setPhase, transitNextState, setNowCharacterType} = useCreateScenario();
  const onPress = (type: string) => {
    if (type === 'criminal') {
      transitNextState(CreateState.CliminalCharacter);
      setNowCharacterType(CharacterType.Criminal);

      setPhase(prev => prev + 1);
      return;
    }

    if (type === 'other') {
      transitNextState(CreateState.OtherCharacter);
      setNowCharacterType(CharacterType.Other);
      setPhase(prev => prev + 1);

      return;
    }
  };
  return <SelectCharacterTypePresenter onPress={onPress} />;
};

export default SelectCharacterType;
