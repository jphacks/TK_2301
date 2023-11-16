import React from 'react';
import VotePresenter from './presenter';
import {Character} from '../../../models/scenario';

type Props = {
  characters: Character[];
};

const Vote = ({characters}: Props) => {
  return <VotePresenter />;
};

export default Vote;
