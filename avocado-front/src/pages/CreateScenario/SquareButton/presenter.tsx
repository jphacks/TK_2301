import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from './style';
import {Props} from './index';
import LinearGradient from 'react-native-linear-gradient';

const SquareButtonPresenter = ({type, onPress}: Props) => {
  const icons: {[key: string]: any} = {
    criminal: require('./icons/criminalIcon.png'),
    other: require('./icons/otherCharacterIcon.png'),
    ai: require('./icons/AIIcon.png'),
    room: require('./icons/room.png'),
    item: require('./icons/item.png'),
  };

  const texts: {[key: string]: {main: string; sub: string}} = {
    criminal: {
      main: '犯人役を作ろう',
      sub: 'まずはここから作ってみよう！',
    },
    other: {
      main: '他の登場人物を作ろう',
      sub: '犯人役ができたら、こちらも作ろう！',
    },
    ai: {
      main: 'AIアシスタントを使う',
      sub: 'カンタン質問から作れます',
    },
    room: {
      main: '部屋を作ろう',
      sub: '証拠品の置いてある部屋を作ろう！',
    },
    item: {
      main: '証拠品を作ろう',
      sub: '部屋に隠す証拠品を作ろう！',
    },
  };

  return (
    <LinearGradient
      colors={['#238EA6', '#23A68E']}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}>
      <Pressable style={styles.container} onPress={() => onPress(type)}>
        <Image style={styles.icon} source={icons[type]} />
        <View>
          <Text style={styles.main}>{texts[type].main}</Text>
          <Text style={styles.sub}>{texts[type].sub}</Text>
        </View>
      </Pressable>
    </LinearGradient>
  );
};

export default SquareButtonPresenter;
