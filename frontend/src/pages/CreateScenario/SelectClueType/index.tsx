import React from 'react';
import SelectClueTypePresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';

const SelectClueType = () => {
  const {setPhase, setTabId, transitNextState} = useCreateScenario();
  const onPress = (type: string) => {
    if (type === 'room') {
      setPhase(prev => prev + 1);
      transitNextState(CreateState.Room);
      return;
    }

    if (type === 'item') {
      setTabId(prev => prev + 1);
      setPhase(prev => prev + 1);
      transitNextState(CreateState.ItemInfo);
      return;
    }
    
  };
  return <SelectClueTypePresenter onPress={onPress} />;
};

export default SelectClueType;
