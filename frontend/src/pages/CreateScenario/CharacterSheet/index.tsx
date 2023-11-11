import React, {useEffect} from 'react';
import CharacterSheetPresenter from './presenter';
import {CreateState, useCreateScenario, CharacterType} from '../createScenario';
import uuid from 'react-native-uuid';

const CharacterSheet = () => {
  const {
    setEditingCharacter,
    setPhase,
    transitNextState,
    targetId,
    setTargetId,
    nowCharacterType,
    otherCharacters,
  } = useCreateScenario();
  useEffect(() => {
    if (targetId === '') {
      const newId = uuid.v4().toString();
      setTargetId(newId);
      console.log('----------');
      console.log(newId);

      switch (nowCharacterType) {
        case CharacterType.Criminal:
          setEditingCharacter({
            id: newId,
            name: '',
            age: 0,
            icon: '',
            profession: '',
            public_info: '',
            private_info: '',
            purpose: '',
            type: CharacterType.Criminal,
            timeline: [
              {
                num: 0,
                text: '',
              },
            ],
          });
          break;
        case CharacterType.Other:
          setEditingCharacter({
            id: newId,
            name: '',
            age: 0,
            icon: '',
            profession: '',
            public_info: '',
            private_info: '',
            purpose: '',
            type: CharacterType.Other,
            timeline: [
              {
                num: 0,
                text: '',
              },
            ],
          });
          break;
      }
      return;
    }

    if (nowCharacterType === CharacterType.Other) {
      console.log(targetId);
      setEditingCharacter(otherCharacters.get(targetId!)!);
    }
  }, []);
  const onPress = (type: string) => {
    if (type === 'ai') {
      transitNextState(CreateState.World, targetId);
      setPhase(prev => prev + 1);
    }
  };
  return <CharacterSheetPresenter onPress={onPress} />;
};

export default CharacterSheet;
