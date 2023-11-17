import React from 'react';
import PhaseCardPresenter from './presenter';
import {Phase} from '../../../models/scenario';

export type Props = {
  phase: Phase;
  onPress: () => void;
  onPressDots?: () => void;
  deleteFunction: () => void;
};

const PhaseCard = ({phase, onPress, onPressDots, deleteFunction}: Props) => {
  return (
    <PhaseCardPresenter
      phase={phase}
      onPress={onPress}
      onPressDots={onPressDots}
      deleteFunction={deleteFunction}
    />
  );
};

export default PhaseCard;
