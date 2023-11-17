import React from 'react';
import ConfirmModalPresenter from './presenter';

export type Props = {
  deleteTarget: string;
  visible: boolean;
  onPressConfirm: () => void;
  onPressCancel: () => void;
};

const ConfirmDeleteModal = ({
  deleteTarget,
  onPressConfirm,
  onPressCancel,
  visible,
}: Props) => {
  return (
    <ConfirmModalPresenter
      deleteTarget={deleteTarget}
      onPressConfirm={onPressConfirm}
      onPressCancel={onPressCancel}
      visible={visible}
    />
  );
};

export default ConfirmDeleteModal;
