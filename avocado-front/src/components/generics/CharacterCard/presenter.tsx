import React from 'react';
import {View, Text, Image} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';
import CircularIcon from '../CircularIcon';

const CharacterCardPresenter = ({character}: ContainerProps) => {
  const {icon, name, age, profession, public_info} = character;
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <CircularIcon url={icon}></CircularIcon>
        <Text style={styles.name}>
          {name} ({age})
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.profession}>職業: {profession}</Text>
        <Text style={styles.description}>{public_info}</Text>
      </View>
    </View>
  );
};

export default CharacterCardPresenter;
