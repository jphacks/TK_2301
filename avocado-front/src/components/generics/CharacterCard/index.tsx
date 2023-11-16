import React from 'react';
import CharacterCardPresenter from './presenter';
import {Character} from '../../../models/scenario';

export type Props = {
  character: Character;
};

const CharacterCard = ({character}: Props) => {
  return <CharacterCardPresenter character={character} />;
};

export default CharacterCard;
