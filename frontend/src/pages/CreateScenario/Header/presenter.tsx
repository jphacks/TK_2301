import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from './style';

type Props = {
  back: () => void;
  text: string;
};

const HeaderPresenter = ({back, text}: Props) => {
  return (
    <View style={styles.header}>
      <Pressable onPress={back} style={styles.backContainer}>
        <Image style={styles.backIcon} source={require('./back.png')} />
      </Pressable>

      <Text style={styles.where}>{text}</Text>
    </View>
  );
};

export default HeaderPresenter;
