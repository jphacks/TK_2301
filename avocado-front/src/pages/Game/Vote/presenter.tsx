import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import {Props as ContainerProps} from './index';
import CharacterVoteButton from '../../../components/generics/CharacterVoteButton';

type Props = {
  isSelected: boolean[];
  onPress: (index: number) => void;
} & ContainerProps;

const VotePresenter = ({characters, isSelected, onPress}: Props) => {
  return (
    <View>
      <Text style={styles.text}>殺人を犯した犯人だと思う人を選んで下さい</Text>
      <View>
        {characters.map((character, index) => {
          return (
            <View style={styles.voteButton}>
              <CharacterVoteButton
                key={index}
                forPlayingGame={true}
                character={character}
                isSelected={isSelected[index]}
                onPress={() => onPress(index)}
                style={{}}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default VotePresenter;
