import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import SquareButton from '../SquareButton';
import {useCreateScenario, CharacterType} from '../createScenario';
import CharacterCard from '../CharacterCard';

type Props = {
  onPress: (type: string) => void;
};

const SelectCharacterTypePresenter = ({onPress}: Props) => {
  const {criminal, otherCharacters} = useCreateScenario();
  return (
    <View style={styles.container}>
      {criminal ? (
        <View>
          <Text style={styles.text}>犯人役のキャラクター</Text>
          <CharacterCard character={criminal} type={CharacterType.Criminal} />
        </View>
      ) : (
        <View>
          <Text style={styles.text}>犯人役のキャラクター</Text>
          <SquareButton type="criminal" onPress={() => onPress('criminal')} />
        </View>
      )}

      <Text style={styles.text}>その他のキャラクター</Text>
      <SquareButton type="other" onPress={() => onPress('other')} />
    </View>
  );
};

export default SelectCharacterTypePresenter;
