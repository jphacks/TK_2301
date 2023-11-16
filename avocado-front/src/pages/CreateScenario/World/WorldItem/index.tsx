import React from 'react';
import WorldItemPresenter from './presenter';

export type Props = {
  name: string;
  onPress: (name: string) => void;
  isSelected: boolean;
};

const WorldItem = ({name, onPress, isSelected}: Props) => {
  return (
    <WorldItemPresenter name={name} onPress={onPress} isSelected={isSelected} />
  );
};

export default WorldItem;
