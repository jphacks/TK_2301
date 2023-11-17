import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import styles from './style';
import Evaluation from '../Evaluation';
import {Scenario} from '../../../models/scenario';

type Props = {
  scenario: Scenario;
  timeLimit: string;
  onClick: () => void;
};

const ScenarioItemPresenter = ({scenario, timeLimit, onClick}: Props) => {
  return (
    <Pressable style={styles.container} onPress={onClick}>
      <Image
        source={{uri: scenario.abstraction.thumbnail}}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{scenario.abstraction.title}</Text>
      <View style={styles.evaluation}>
        <Text style={styles.rating}>{4.0}</Text>
        <Evaluation rating={4} />
      </View>
      <View style={styles.info}>
        <Text style={styles.infoText}>
          {scenario.abstraction.numberOfPlayers}人/
        </Text>
        <Text style={styles.infoText}>{timeLimit}</Text>
      </View>
    </Pressable>
  );
};

export default ScenarioItemPresenter;
