import React from 'react';
import ScenarioItemPresenter from './presenter';
import {Scenario} from '../../../models/scenario';

type Props = {
  scenario: Scenario;
  navigation: any;
};

const ScenarioItem = ({scenario, navigation}: Props) => {
  function decimalToHoursAndMinutes(decimalTime: number): string {
    const hours = Math.floor(decimalTime / 60);
    // 分を計算
    const minutes = decimalTime % 60;

    // 結果の文字列を構築
    let result = '';
    if (hours > 0) {
      result += `${hours}時間`;
    }
    if (minutes > 0) {
      if (result.length > 0) {
        result += ' ';
      }
      result += `${minutes}分`;
    }

    return result;
  }

  const formattedTimeLimit = decimalToHoursAndMinutes(
    scenario.abstraction.requiredTime,
  );

  const onClick = () => {
    navigation.navigate('ScenarioDetailsPage', {
      scenario,
      timeRequired: formattedTimeLimit,
    });
  };

  return (
    <ScenarioItemPresenter
      scenario={scenario}
      timeLimit={formattedTimeLimit}
      onClick={onClick}
    />
  );
};

export default ScenarioItem;
