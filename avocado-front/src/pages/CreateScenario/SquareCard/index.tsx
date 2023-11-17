import React from 'react';
import SquareCardPresenter from './presenter';

export type Props = {
  id: number | string;
  label?: string;
  onPress: () => void;
  style?: any;
  onPressDots?: () => void;
  deleteFunction: () => void;
};

const SquareCard = ({
  id,
  label,
  onPress,
  style,
  onPressDots,
  deleteFunction,
}: Props) => {
  return (
    <SquareCardPresenter
      label={label}
      id={id}
      onPress={onPress}
      style={style}
      onPressDots={onPressDots}
      deleteFunction={deleteFunction}
    />
  );
};

export default SquareCard;
