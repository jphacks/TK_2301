import React from 'react';
import FetchingModalPresenter from './presenter';

export type Props = {
  textContent: string;
};

const FetchingModal = ({textContent}: Props) => {
  return <FetchingModalPresenter textContent={textContent}  />;
};

export default FetchingModal;
