import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ScenarioSelectorPresenter from './presenter';
import firestore from '@react-native-firebase/firestore';
import {Scenario} from '../../../models/scenario';

type Props = {
  title: string;
  navigation: any;
};

const ScenarioSelector = ({title, navigation}: Props) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    firestore()
      .collection('scenario')
      .onSnapshot(querySnapshot => {
        const newScenarios: Scenario[] = [];
        querySnapshot.forEach(documentSnapshot => {
          newScenarios.push(documentSnapshot.data() as Scenario);
        });
        setScenarios(newScenarios);
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
