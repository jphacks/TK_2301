import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from './style';
import {Props} from './index';

const TrickItemPresenter = ({trick, setSelectedTricks}: Props) => {
  const [pressed, setPressed] = React.useState(false);
  const onPress = () => {
    setPressed(true);
    setSelectedTricks(prev => [...prev, trick.name]);
  };
  return (
    <Pressable
      style={[
        styles.container,
        pressed ? {borderWidth: 2, borderColor: '#fff'} : null,
      ]}
      onPress={onPress}>
      <Text style={styles.title}>{trick.name}</Text>
      <Text style={styles.text}>{trick.uncommonSense}</Text>
      <Text style={styles.text}>{trick.principle}</Text>
      <Text style={styles.text}>{trick.illusion}</Text>
    </Pressable>
  );
};

export default TrickItemPresenter;
