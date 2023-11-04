import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Props} from './index';
import styles from './style';

const WorldItemPresenter = ({name, onPress, isSelected}: Props) => {
  return (
    <View style={[styles.container, isSelected ? styles.border : null]}>
      <Pressable onPress={() => onPress(name)}>
        <Text style={styles.name}>{name}</Text>
      </Pressable>
    </View>
  );
};

export default WorldItemPresenter;
