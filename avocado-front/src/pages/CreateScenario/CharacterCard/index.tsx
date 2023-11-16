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
    setNowCharacterType(type);

    switch (type) {
      case CharacterType.Criminal:
        transitNextState(CreateState.CriminalsCharacter, id);
        break;
      case CharacterType.Other:
        setNowCharacterType(CharacterType.Other);
        transitNextState(CreateState.OtherCharacter, id);
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
