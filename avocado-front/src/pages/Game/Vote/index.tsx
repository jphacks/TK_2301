import React from 'react';
import VotePresenter from './presenter';
import {Character} from '../../../models/scenario';
import {useGame} from '../game.context';

export type Props = {
  characters: Character[];
};

const Vote = ({characters}: Props) => {
  // falseの配列を作成
  const [isSelected, setIsSelected] = React.useState<boolean[]>(
    new Array(characters.length).fill(false),
  );
  const {setVotedCharacterName} = useGame();

  const onPress = (index: number) => {
    const newIsSelected = isSelected;
    newIsSelected.map((_, i) => {
      if (i !== index) {
        newIsSelected[i] = false;
      } else {
        newIsSelected[i] = true;
      }
    });
    console.log(newIsSelected);
    setIsSelected(newIsSelected);
    setVotedCharacterName(characters[index].name);
  };

  return (
    <VotePresenter
      characters={characters}
      isSelected={isSelected}
      onPress={onPress}
    />
  );
};

export default Vote;
