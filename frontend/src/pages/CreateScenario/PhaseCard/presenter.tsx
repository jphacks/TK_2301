import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from './style';
import {Props as ContainerProps} from './index';

type Props = {} & ContainerProps;

const PhaseCardPresenter = ({phase}: Props) => {
  return (
    <Pressable style={styles.container}>
      <View style={{}}>
        <Text style={styles.name}>{phase.name}</Text>
        <Text style={styles.numberOfSurveys}>
          調査可能な回数 {phase.numberOfSurveys}回
        </Text>
      </View>
      <Image source={require('./enter.png')} />
    </Pressable>
  );
};

export default PhaseCardPresenter;
