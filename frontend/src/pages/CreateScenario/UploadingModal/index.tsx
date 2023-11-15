import React from 'react';
import UploadingModalPresenter from './presenter';

export type Props = {
  textContent: string;
};

const UploadingModal = ({textContent}: Props) => {
  return <UploadingModalPresenter textContent={textContent} />;
};

export default UploadingModal;
