import React from 'react';
import SelectCharacterTypePresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';

const SelectCharacterType = () => {
  const {setPhase, transitNextState} = useCreateScenario();
  const onPress = (type: string) => {
    if (type === 'criminal') {
      transitNextState(CreateState.CliminalCharacter);

      setPhase(prev => prev + 1);
      return;
    }

    if (type === 'other') {
      transitNextState(CreateState.OtherCharacter);
      setPhase(prev => prev + 1);

      return;
    }
  };
  return <SelectCharacterTypePresenter onPress={onPress} />;
};

export default SelectCharacterType;
