import React from 'react';
import TrickItemPresenter from './presenter';
import {Trick} from '../../../../models/scenario';

export type Props = {
  trick: Trick;
  type: 'item' | 'trivia';
  setSelectedItemTricks?: React.Dispatch<React.SetStateAction<Trick[]>>;
  setSelectedTriviaTricks?: React.Dispatch<React.SetStateAction<Trick[]>>;
};

const TrickItem = ({
  trick,
  type,
  setSelectedItemTricks,
  setSelectedTriviaTricks,
}: Props) => {
  return (
    <TrickItemPresenter
      trick={trick}
      type={type}
      setSelectedItemTricks={setSelectedItemTricks}
      setSelectedTriviaTricks={setSelectedTriviaTricks}
    />
  );
};

export default TrickItem;
