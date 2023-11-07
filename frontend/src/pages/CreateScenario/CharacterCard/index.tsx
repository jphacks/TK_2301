import React from 'react';
import CharacterCardPresenter from './presenter';
import {useCreateScenario, CharacterType, CreateState} from '../createScenario';

export type Props = {
  character: {
    name: string;
    age: number;
    profession: string;
    open: string;
    private: string;
    timeline: {
      num: number;
      text: string;
    }[];
    purpose: string;
  };
  type: CharacterType;
};

const CharacterCard = ({character, type}: Props) => {
  const {setEditingCharacter, transitNextState, setNowCharacterType, setPhase} =
    useCreateScenario();
  const onPress = () => {
    setEditingCharacter(character);
    transitNextState(CreateState.OtherCharacter);
    setNowCharacterType(CharacterType.Other);
    setPhase(prev => prev + 1);
  };
  return (
    <CharacterCardPresenter
      character={character}
      type={type}
      onPress={onPress}
    />
  );
};

export default CharacterCard;
