import React from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {Props as ContainerProps} from './index';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {} & ContainerProps;

const PhaseCardPresenter = ({phase, onPress, onPressDots}: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={{}}>
        <Text style={styles.name}>
          {!phase.name ? '名称未設定' : phase.name}
        </Text>
        <Text style={styles.numberOfSurveys}>
          調査可能な回数 {phase.numberOfSurveys}回
        </Text>
      </View>
      <TouchableOpacity onPress={onPressDots}>
        <Entypo name="dots-three-horizontal" color={'white'} size={16}></Entypo>
      </TouchableOpacity>
    </Pressable>
  );
};

export default PhaseCardPresenter;
