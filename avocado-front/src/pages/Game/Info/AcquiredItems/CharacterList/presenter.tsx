import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {Character} from '../../../../../models/scenario';
import CharacterVoteButton from '../../../../../components/generics/CharacterVoteButton';
import PrimaryButton from '../../../../../components/generics/PrimaryButton';
import styles from './style';

type Props = {
  characters: Character[];
  isSelected: boolean[];
  onPress: (index: number) => void;
  cancel: () => void;
  transfer: () => void;
};

const CharacterListPresenter = ({
  characters,
  isSelected,
  onPress,
  cancel,
  transfer,
}: Props) => {
  return (
    <View style={styles.container}>
      {characters.map((character, index) => {
        console.log(isSelected[index]);
        return (
          <View>
            <CharacterVoteButton
              character={character}
              forPlayingGame={true}
              isSelected={isSelected[index]}
              style={{}}
              onPress={() => onPress(index)}
            />
          </View>
        );
      })}
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.cancel} onPress={cancel}>
          <Text style={styles.cancelText}>キャンセル</Text>
        </Pressable>
        <PrimaryButton width={146} text={'譲渡する'} onPress={transfer} />
      </View>
    </View>
  );
};

export default CharacterListPresenter;
