import React from 'react';
import PhaseCardPresenter from './presenter';
import {Phase} from '../../../models/scenario';

export type Props = {
  phase: Phase;
  onPress: () => void;
  onPressDots?: () => void;
};

const PhaseCard = ({phase, onPress, onPressDots}: Props) => {
  return <PhaseCardPresenter phase={phase} onPress={onPress} onPressDots={onPressDots} />;
};

export default PhaseCard;
