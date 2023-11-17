import React from 'react';
import OtherSettingsPresenter from './presenter';
import {useCreateScenario} from '../createScenario';

const OtherSettings = () => {
  const {abstraction, setAbstraction} = useCreateScenario();

  const onTitleChange = (text: string) => {
    abstraction.title = text;
    setAbstraction(abstraction);
  };

  const onRequiredTimeChange = (num: string) => {
    abstraction.requiredTime = Number.parseInt(num);
    setAbstraction(abstraction);
  };

  const onNumOfPlayerChange = (num: number) => {
    abstraction.numberOfPlayers = num;
    setAbstraction(abstraction);
  };

  const onOutLineChange = (text: string) => {
    abstraction.outline = text;
    setAbstraction(abstraction);
  };

  return (
    <OtherSettingsPresenter
      targetAbstraction={abstraction}
      onTitleChange={onTitleChange}
      onRequiredTimeChange={onRequiredTimeChange}
      onNumOfPlayerChange={onNumOfPlayerChange}
      onOutLineChange={onOutLineChange}
    />
  );
};

export default OtherSettings;
