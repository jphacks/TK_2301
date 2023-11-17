import React, {useEffect} from 'react';
import CharacterVoteButtonPresenter from './presenter';
import {Character} from '../../../models/scenario';

export type Props = {
  character?: Character;
  forPlayingGame: boolean; // trueの場合、チェックボタンがつく
  isSelected?: boolean; // 選択されたとき、チェックがつく
  style: any;
  isNone?: boolean; // シナリオ作成画面において、「この中に犯人はいない」を表示させるために使う
  onPress: () => void;
};

const CharacterVoteButton = ({
  character,
  forPlayingGame,
  isSelected,
  style,
  isNone,
  onPress,
}: Props) => {
  useEffect(() => {
    console.log('CharacterVoteButton');
  }, [isSelected]);
  return (
    <CharacterVoteButtonPresenter
      character={character}
      forPlayingGame={forPlayingGame}
      isSelected={isSelected}
      style={style}
      isNone={isNone}
      onPress={onPress}
    />
  );
};

export default CharacterVoteButton;
