import React from 'react';
import CharacterVoteButtonPresenter from './presenter';
import {Character} from '../../../models/scenario';

export type Props = {
  character?: Character;
  forPlayingGame: boolean; // trueの場合、チェックボタンがつく
  isSelected?: boolean; // 選択されたとき、チェックがつく
  style: any;
  isNone?: boolean; // シナリオ作成画面において、「この中に誰もいません」を表示させるために使う
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
