import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import SquareButton from '../SquareButton';
import {useCreateScenario} from '../createScenario';

type Props = {
  onPress: (type: string) => void;
};

const SelectClueTypePresenter = ({onPress}: Props) => {
  const {criminals, otherCharacters} = useCreateScenario();
  return (
    <View style={styles.container}>
      {criminals.length == 0 ? (
        <View>
          <Text style={styles.text}>フロアマップ</Text>
          <SquareButton type="room" onPress={() => onPress('room')} />
        </View>
      ) : (
        <View></View>
      )}

      <Text style={styles.text}>証拠品／情報</Text>
      <SquareButton type="item" onPress={() => onPress('item')} />
    </View>
  );
};

export default SelectClueTypePresenter;
