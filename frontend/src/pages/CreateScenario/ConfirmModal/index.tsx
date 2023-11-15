import React from "react";
import ConfirmModalPresenter from "./presenter";

export type Props = {
  titleTextContent: string;
  buttonTextContent: string;
  onPressConfirm:() => void
};

const ConfirmModal = ({ titleTextContent, buttonTextContent, onPressConfirm}: Props) => {
  return <ConfirmModalPresenter  titleTextContent={titleTextContent} buttonTextContent={buttonTextContent} onPressConfirm={onPressConfirm}  />;
};

export default ConfirmModal;
