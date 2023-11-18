import React from 'react';
import SelectCharacterTypePresenter from './presenter';
import {CreateState, CharacterType, useCreateScenario} from '../createScenario';
import {sampleEditingCharacter, sampleEditingCharacterForReset} from '../../../models/samples';

const SelectCharacterType = () => {
  const {setPhase, transitNextState, setNowCharacterType, setEditingCharacter} =
    useCreateScenario();

  const addOtherCharacter = () => {
    // 前のキャラクタ情報のキャッシュをリセットすることで、キャラクターシート移行時のちらつきをなくす
    sampleEditingCharacterForReset.type = CharacterType.Other;
    setEditingCharacter(sampleEditingCharacterForReset);

    transitNextState(CreateState.OtherCharacter);
    setNowCharacterType(CharacterType.Other);

    setPhase(prev => prev + 1);
  };

  const onPress = (type: string) => {
    if (type === 'criminal') {
      // 前のキャラクタ情報のキャッシュをリセットすることで、キャラクターシート移行時のちらつきをなくす
      sampleEditingCharacterForReset.type = CharacterType.Criminal;
      setEditingCharacter(sampleEditingCharacterForReset);

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
