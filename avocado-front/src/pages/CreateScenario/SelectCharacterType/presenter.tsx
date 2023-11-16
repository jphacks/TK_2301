import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './style';
import SquareButton from '../SquareButton';
import {useCreateScenario, CharacterType} from '../createScenario';
import CharacterCard from '../CharacterCard';
import PurpleButton from '../../../components/generics/PurpleButton';
import PrimaryButton from '../../../components/generics/PrimaryButton';

type Props = {
  onPress: (type: string) => void;
  onPressAdd: () => void;
};

const SelectCharacterTypePresenter = ({onPress, onPressAdd}: Props) => {
  const {criminal, otherCharacters} = useCreateScenario();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>犯人役のキャラクター</Text>
      </View>
      {criminal.name !== '' ? (
        <CharacterCard
          id={criminal.id}
          character={criminal}
          type={CharacterType.Criminal}
        />
      ) : (
        <SquareButton type="criminal" onPress={() => onPress('criminal')} />
      )}

      <View style={styles.headerContainer}>
        <Text style={styles.text}>その他のキャラクター</Text>
        {otherCharacters.size > 0 && (
          <PurpleButton title={'追加する'} onClick={onPressAdd} />
        )}
      </View>
      {otherCharacters.size > 0 ? (
        <View style={{marginBottom: 10}}>
          {Array.from(otherCharacters, ([key, item]) => {
            return (
              <CharacterCard
                key={key}
                id={key}
                character={item}
                type={CharacterType.Other}
              />
            );
          })}
        </View>
      ) : (
        <SquareButton type="other" onPress={() => onPress('other')} />
      )}
    </ScrollView>
  );
};

export default SelectCharacterTypePresenter;
