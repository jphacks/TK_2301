import React from 'react';
import PhaseCardPresenter from './presenter';
import {Phase} from '../../../models/scenario';

export type Props = {
  phase: Phase;
};

const PhaseCard = ({phase}: Props) => {
  return <PhaseCardPresenter phase={phase} />;
};

export default PhaseCard;
