import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';

type Props = {
  time: string;
};

const TimerPresenter = ({time}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{time}</Text>
    </View>
  );
};

export default TimerPresenter;
