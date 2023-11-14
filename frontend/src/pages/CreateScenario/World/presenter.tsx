import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './style';
import WorldItem from './WorldItem';
import PrimaryButton from '../../../components/generics/PrimaryButton';
import FetchingModal from '../FechingModal';

type Props = {
  onPress: (type: string) => void;
  next: () => void;
  value: string;
};

const WorldPresenter = ({onPress, next, value}: Props) => {
  const items = [
    '吹雪の中の山小屋',
    '放課後の教室',
    '文化祭の演劇',
    '豪華客船',
  ];
  return (
    <View style={styles.container}>
      <FetchingModal textContent={'生成中...'} />
      <Text style={[styles.text, {textAlign: 'center'}]}>
        舞台の世界観を入れてみましょう
      </Text>

      <TextInput
        style={styles.input}
        placeholder="舞台の世界観"
        placeholderTextColor="#888888"
        value={value}
      />

      <Text style={styles.text}>世界観の例</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 267}}>
        {items.map((item, index) => (
          <WorldItem
            key={index}
            name={item}
            onPress={onPress}
            isSelected={item === value}
          />
        ))}
      </View>

      <PrimaryButton text="トリックのヒントを生成" onPress={next} width={320} />
    </View>
  );
};

export default WorldPresenter;
