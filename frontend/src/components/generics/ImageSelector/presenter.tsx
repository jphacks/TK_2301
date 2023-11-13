import React from 'react';
import {Image, Pressable, Text, TouchableHighlight, View} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';
import PrimaryButton from '../PrimaryButton';

type Props = {
  url: any;
  text: string;
} & ContainerProps;

const ImageSelectorPresenter = ({onPress, style, text}: Props) => {
  return (
    <TouchableHighlight onPress={onPress} style={[styles.container, style]}>
      <View>
        <View style={{alignItems: 'center'}}>
          <Image source={require('./camera.png')} />
        </View>

        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ImageSelectorPresenter;
