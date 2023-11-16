import React from 'react';
import HintItemPresenter from './presenter';

export type Props = {
  name: string;
  type: string;
  funcs: {
    addItem: (item: string) => void;
    addPhenomena: (phenomena: string) => void;
  };
};

const HintItem = ({name, type, funcs}: Props) => {
  return <HintItemPresenter name={name} type={type} funcs={funcs} />;
};

export default HintItem;
