import React from 'react';
import CharactersPresenter from './presenter';
import {Character} from '../../../models/scenario';

export type Props = {
  characters: Character[];
};

const Characters = ({characters}: Props) => {
  return <CharactersPresenter characters={characters} />;
};

export default Characters;
