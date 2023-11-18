import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';
import PrimaryButton from '../../../../../components/generics/PrimaryButton';

type Props = {
  get: () => void;
  close: () => void;
} & ContainerProps;

const ItemCardPresenter = ({get, close, item}: Props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={close} style={styles.close}>
        <Image source={require('./close.png')} />
      </Pressable>
      <Image source={{uri: item?.uri}} style={styles.image} />
      <Text style={styles.itemName}>{item?.name}</Text>
      <Text style={styles.category}>{item?.category}</Text>
      <Text style={styles.description}>{item?.description}</Text>
      <PrimaryButton text="譲渡する" onPress={get} width={238} />
    </View>
  );
};

export default ItemCardPresenter;
