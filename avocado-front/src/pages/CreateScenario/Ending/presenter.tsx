import React from 'react';
import {ScrollView, Text} from 'react-native';
import {CreateState, useCreateScenario} from '../createScenario';
import CharacterVoteButton from '../../../components/generics/CharacterVoteButton';
import styles from './style';

const EndingPresenter = () => {
  const {
    otherCharacters,
    criminal,
    transitNextState,
    setEditingCharacter,
    setPhase,
  } = useCreateScenario();
  const characters = [...Array.from(otherCharacters.values()), criminal];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>投票パターン</Text>
      {characters.map(
        (character, index) =>
          character.id !== '' && (
            <CharacterVoteButton
              key={index}
              character={character}
              forPlayingGame={false}
              style={styles.characterVoteButton}
              onPress={() => {
                setEditingCharacter(character);
                setPhase(prev => prev + 1);
                transitNextState(CreateState.EndingContent, character.id);
              }}
            />
          ),
      )}

      <CharacterVoteButton
        isNone={true}
        forPlayingGame={false}
        style={styles.characterVoteButton}
        onPress={() => {
          setPhase(prev => prev + 1);
          transitNextState(CreateState.EndingContent, 'none');
        }}
      />
    </ScrollView>
  );
};

export default EndingPresenter;
