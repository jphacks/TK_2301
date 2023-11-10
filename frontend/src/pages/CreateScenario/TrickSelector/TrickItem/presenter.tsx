import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Trick} from '../../../../models/scenario';
import styles from './style';

interface Props {
  trick: Trick | null;
  type: 'item' | 'trivia';
  setSelectedItemTricks:
    | React.Dispatch<React.SetStateAction<Trick[]>>
    | undefined;
  setSelectedTriviaTricks:
    | React.Dispatch<React.SetStateAction<Trick[]>>
    | undefined;
}

const TrickItemPresenter = ({
  trick,
  type,
  setSelectedItemTricks,
  setSelectedTriviaTricks,
}: Props) => {
  const [pressed, setPressed] = React.useState(false);

  const onPress = () => {
    setPressed(true);
    if (trick) {
      switch (type) {
        case 'item':
          if (setSelectedItemTricks) {
            setSelectedItemTricks(prev => [...prev, trick]);
          }
          break;
        case 'trivia':
          if (setSelectedTriviaTricks) {
            setSelectedTriviaTricks(prev => [...prev, trick]);
          }
          break;
      }
    }
  };

  return (
    <Pressable
      style={[styles.container, {borderWidth: pressed ? 2 : 0}]}
      onPress={onPress}>
      {trick && (
        <>
          <Text style={styles.title}>{trick.name}</Text>
          <View style={styles.discription}>
            <Text style={styles.text}>{trick.uncommonSense}</Text>
            <Text style={styles.text}>{trick.principle}</Text>
            <Text style={styles.text}>{trick.illusion}</Text>
          </View>
        </>
      )}
    </Pressable>
  );
};

export default TrickItemPresenter;
