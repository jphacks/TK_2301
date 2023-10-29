import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from './style';
import {Props} from './index';

const TrickItemPresenter = ({trick, setSelectedTricks}: Props) => {
  return (
    <Pressable
      style={[styles.container]}
      onPress={() => setSelectedTricks(prev => [...prev, trick.a])}>
      <Text style={styles.title}>{trick.a}</Text>
      <Text style={styles.text}>{trick.b}</Text>
    </Pressable>
  );
};

export default TrickItemPresenter;
