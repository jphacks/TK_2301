import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';

type Props = {
  onPress: () => void;
} & ContainerProps;

const CharacterCardPresenter = ({character, type, onPress}: Props) => {
  const {name, age, profession, public_info} = character;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.nameContainer}>
        {/*<Image source={icon} style={styles.icon} />*/}
        <Text style={styles.name}>
          {name}({age})
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.profession}>職業:{profession}</Text>
        <Text style={styles.description}>{public_info}</Text>
      </View>
    </Pressable>
  );
};

export default CharacterCardPresenter;
