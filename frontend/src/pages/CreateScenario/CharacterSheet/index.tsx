import React from 'react';
import CharacterSheetPresenter from './presenter';
import {useCreateScenario} from '../createScenario';

const CharacterSheet = () => {
  const {setIsCreatingCharacter, setIsOther, setPhase, setIsWorld} =
    useCreateScenario();
  const onPress = (type: string) => {
    if (type === 'ai') {
      setIsCreatingCharacter(false);
      setIsOther(false);
      setIsWorld(true);
      setPhase(prev => prev + 1);
    }
  };
  return <CharacterSheetPresenter onPress={onPress} />;
};

export default CharacterSheet;
