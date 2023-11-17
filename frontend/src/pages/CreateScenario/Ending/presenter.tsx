import React from 'react';
import {Text, View} from 'react-native';
import {CreateState, useCreateScenario} from '../createScenario';
import CharacterVoteButton from '../../../components/generics/CharacterVoteButton';
import styles from './style';

const EndingPresenter = () => {
  const {
    otherCharacters,
    criminal,
    transitNextState,
    setEditingCharacter,
    endings,
    setTabId,
    setPhase,
  } = useCreateScenario();
  const characters = [...Array.from(otherCharacters.values()), criminal];
  return (
    <View style={styles.container}>
      <Text style={styles.text}>投票パターン</Text>
      {characters.map((character, index) => (
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
      ))}

      <CharacterVoteButton
        isNone={true}
        forPlayingGame={false}
        style={styles.characterVoteButton}
        onPress={() => {
          setPhase(prev => prev + 1);
          transitNextState(CreateState.EndingContent, 'none');
        }}
      />
    </View>
  );
};

export default EndingPresenter;
