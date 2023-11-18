import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from './style';
import {Props} from './index';
import CircularIcon from '../../../components/generics/CircularIcon';

const ImpressionCardPresenter = ({props}: Props) => {
  const {icon, name, comment} = props;
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <CircularIcon url={icon} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
};

export default ImpressionCardPresenter;
