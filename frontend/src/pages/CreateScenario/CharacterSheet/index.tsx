import React from 'react';
import CharacterSheetPresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';

const CharacterSheet = () => {
  const {setPhase, transitNextState, itemImageCandidate} = useCreateScenario();

  const onPress = (type: string) => {
    if (type === 'ai') {
      transitNextState(CreateState.World);
      setPhase(prev => prev + 1);
    }
  };
  return <CharacterSheetPresenter onPress={onPress} />;
};

export default CharacterSheet;
