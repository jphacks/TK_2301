import React from 'react';
import SelectCharacterTypePresenter from './presenter';
import {CreateState, CharacterType, useCreateScenario} from '../createScenario';
import {sampleEditingCharacter} from '../../../models/samples';

const SelectCharacterType = () => {
  const {setPhase, transitNextState, setNowCharacterType, setEditingCharacter} =
    useCreateScenario();

  const addOtherCharacter = () => {
    sampleEditingCharacter.type = CharacterType.Other;
    setEditingCharacter(sampleEditingCharacter);
    transitNextState(CreateState.OtherCharacter);
    setNowCharacterType(CharacterType.Other);
    setPhase(prev => prev + 1);
  };

  const onPress = (type: string) => {
    if (type === 'criminal') {
      sampleEditingCharacter.type = CharacterType.Criminal;
      setEditingCharacter(sampleEditingCharacter);
      transitNextState(CreateState.CriminalsCharacter);
      setNowCharacterType(CharacterType.Criminal);

      setPhase(prev => prev + 1);
      return;
    }

    if (type === 'other') {
      addOtherCharacter();

      return;
    }
  };

  const onPressAdd = () => {
    addOtherCharacter();
  };

  return (
    <SelectCharacterTypePresenter onPress={onPress} onPressAdd={onPressAdd} />
  );
};

export default SelectCharacterType;
