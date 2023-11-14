import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import PurpleButton from '../../../components/generics/PurpleButton';
import {Props as ContainerProps} from './index';
import Timer from '../Timer';

type Props = {
  onClick: () => void;
} & ContainerProps;

const GameHaderPresenter = ({props, onClick}: Props) => {
  const {phase, setNowPhase, nowPhase, navigation} = props;
  console.log(phase);
  const switchRender = () => {
    if (phase.timeLimit === 0) {
      return (
        <PurpleButton
          onClick={onClick}
          title={'次へ'}
          style={styles.purpleButton}
        />
      );
    } else {
      return (
        <Timer
          key={phase.phaseId}
          initialTime={phase.timeLimit}
          setNowPhase={props.setNowPhase}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{phase.name}</Text>
      {switchRender()}
    </View>
  );
};

export default GameHaderPresenter;
