import React from 'react';
import PhaseCardPresenter from './presenter';
import {Phase} from '../../../models/scenario';

export type Props = {
  phase: Phase;
  onPress: () => void;
};

const PhaseCard = ({phase, onPress}: Props) => {
  return <PhaseCardPresenter phase={phase} onPress={onPress} />;
};

export default PhaseCard;
