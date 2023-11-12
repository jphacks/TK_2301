import React from 'react';
import CharacterCardPresenter from './presenter';
import {useCreateScenario, CharacterType, CreateState} from '../createScenario';
import {Character} from '../../../models/scenario';

export type Props = {
  id?: string;
  character: Character;
  type: CharacterType;
};

const CharacterCard = ({id, character, type}: Props) => {
  const {setEditingCharacter, transitNextState, setNowCharacterType, setPhase} =
    useCreateScenario();
  const onPress = () => {
    setEditingCharacter(character);
    console.log(id);
    transitNextState(CreateState.OtherCharacter, id);
    switch (type) {
      case CharacterType.Criminal:
        setNowCharacterType(CharacterType.Criminal);
        break;
      case CharacterType.Other:
        setNowCharacterType(CharacterType.Other);
        break;
    }
    setPhase(prev => prev + 1);
  };
  return (
    <CharacterCardPresenter
      id={id}
      character={character}
      type={type}
      onPress={onPress}
    />
  );
};

export default CharacterCard;
