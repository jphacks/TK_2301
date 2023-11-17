import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ScenarioSelectorPresenter from './presenter';
import {collection, getDocs} from 'firebase/firestore';
import {Scenario} from '../../../models/scenario';
import {createScenarioFirestore} from '../../../api/firebase/firestore';

type Props = {
  title: string;
  navigation: any;
};

const ScenarioSelector = ({title, navigation}: Props) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    createScenarioFirestore()
      .getAll()
      .then(snapshot => {
        const scenarios: Scenario[] = [];
        snapshot.forEach(doc => {
          const scenario = doc.data() as Scenario;
          scenarios.push(scenario);
        });
        setScenarios(scenarios);
      });
  }, []);

  return (
    <ScenarioSelectorPresenter
      title={title}
      navigation={navigation}
      scenarios={scenarios}
    />
  );
};

export default ScenarioSelector;
