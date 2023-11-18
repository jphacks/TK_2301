import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';

type Props = {
  purpose: string;
};

const PurposePresenter = ({purpose}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{purpose}</Text>
    </View>
  );
};

export default PurposePresenter;
