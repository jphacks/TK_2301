import React, {useEffect, useState} from 'react';
import PhasePresenter from './presenter';
import {useCreateScenario} from '../createScenario';
import uuid from 'react-native-uuid';

const Phase = () => {
  const {phaseData, setPhaseData, setTargetId, targetId} = useCreateScenario();

  useEffect(() => {
    if (targetId === '') {
      const uid = uuid.v4().toString();
      phaseData.set(uid, {
        name: '',
        phaseId: uid,
        numberOfSurveys: 0,
        timeLimit: 0,
      });
      setTargetId(uid);
      setPhaseData(phaseData);
    }
  }, []);
  return <PhasePresenter targetPhase={phaseData.get(targetId || '')} />;
};

export default Phase;
