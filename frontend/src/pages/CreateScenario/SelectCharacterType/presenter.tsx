import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import SquareButton from '../SquareButton';
import {useCreateScenario} from '../createScenario';

type Props = {
  onPress: (type: string) => void;
};

const SelectCharacterTypePresenter = ({onPress}: Props) => {
  const {criminals, otherCharacters} = useCreateScenario();
  return (
    <View style={styles.container}>
      {criminals.length == 0 ? (
        <View>
          <Text style={styles.text}>犯人役のキャラクター</Text>
          <SquareButton type="criminal" onPress={() => onPress('criminal')} />
        </View>
      ) : (
        <View></View>
      )}

      <Text style={styles.text}>その他のキャラクター</Text>
      <SquareButton type="other" onPress={() => onPress('other')} />
    </View>
  );
};

export default SelectCharacterTypePresenter;
