import React from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {} & ContainerProps;

const SquareCardPresenter = ({label, onPress, style, onPressDots}: Props) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <View>
        <Text style={styles.main}>{label}</Text>
      </View>
      <TouchableOpacity onPress={onPressDots}>
        <Entypo name="dots-three-horizontal" color={'white'} size={16}></Entypo>
      </TouchableOpacity>
    </Pressable>
  );
};

export default SquareCardPresenter;
