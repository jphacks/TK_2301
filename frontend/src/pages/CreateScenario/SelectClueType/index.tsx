import React from 'react';
import SelectClueTypePresenter from './presenter';
import {useCreateScenario} from '../createScenario';

const SelectClueType = () => {
  const {setPhase, setTabId, setIsItemInfo} = useCreateScenario();
  const onPress = (type: string) => {
    if (type === 'room') {
    } else if (type === 'item') {
      setTabId(prev => prev + 1);
      setPhase(prev => prev + 1);
      setIsItemInfo(true);
    }
  };
  return <SelectClueTypePresenter onPress={onPress} />;
};

export default SelectClueType;
