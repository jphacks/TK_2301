import React from 'react';
import SquareButtonPresenter from './presenter';

export type Props = {
  type: string;
  onPress: (type: string) => void;
};

const SquareButton = ({type, onPress}: Props) => {
  return <SquareButtonPresenter type={type} onPress={onPress} />;
};

export default SquareButton;
