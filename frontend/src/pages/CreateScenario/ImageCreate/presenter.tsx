import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './style';
import PrimaryButton from '../../../components/generics/PrimaryButton';

type Props = {
  onChangeText: (text: string) => void;
  onPress: () => void;
  image: string;
};

const ImageCreatePresenter = ({onChangeText, onPress, image}: Props) => {
  return (
    <View style={styles.container}>
      <Text>{image}</Text>
      <Text style={styles.text}>作りたい画像のキーワード入れましょう</Text>

      <TextInput
        style={[styles.input]}
        placeholder="中世風のナイフ"
        placeholderTextColor="#888888"
        onChangeText={text => onChangeText(text)}
      />

      <Text style={[styles.text, {textAlign: 'left'}]}>キーワードの例</Text>
      <Text style={styles.sm}>
        こんな感じで入力すると、よりイメージに近い画像を作成 できます！
      </Text>
      <Text style={styles.bullet}>・中世風のナイフ</Text>
      <Text style={styles.bullet}>・可愛いスマホ</Text>
      <Text style={styles.bullet}>・SFな銃</Text>

      <View style={styles.button}>
        <PrimaryButton width={320} onPress={onPress} text={'画像を生成'} />
      </View>
    </View>
  );
};

export default ImageCreatePresenter;
