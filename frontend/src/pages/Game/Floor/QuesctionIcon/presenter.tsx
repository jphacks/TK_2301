import React from 'react';
import {Image, Pressable, View} from 'react-native';

type Props = {
  position: {
    top: number;
    left: number;
  };
  show: () => void;
  hide: () => void;
  itemId: string;
};

const QuestionPresenter = ({position, show, hide, itemId}: Props) => {
  return (
    <Pressable
      onPress={show}
      style={{position: 'absolute', top: position.top, left: position.left}}>
      <Image source={require('./question.png')} />
    </Pressable>
  );
};

export default QuestionPresenter;
