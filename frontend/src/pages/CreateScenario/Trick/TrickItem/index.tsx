import React from 'react';
import TrickItemPresenter from './presenter';

export type Props = {
  trick: {
    name: string;
    uncommonSense: string;
    principle: string;
    illusion: string;
  };
  setSelectedTricks: React.Dispatch<React.SetStateAction<string[]>>;
};

const TrickItem = ({trick, setSelectedTricks}: Props) => {
  return (
    <TrickItemPresenter trick={trick} setSelectedTricks={setSelectedTricks} />
  );
};

export default TrickItem;
