import React from "react";
import LabeledTextInputPresenter from "./presenter";

export type Props = {
  labelName: string;
  placeholder?: string;
  style?: any
  onTextChange?: (text: string) => void;
};

const LabeledTextInput = ({ labelName, placeholder, style, onTextChange }: Props) => {
  return (
    <LabeledTextInputPresenter
      placeholder={placeholder}
      labelName={labelName}
      style={style}
      onTextChange={onTextChange}
    />
  );
};

export default LabeledTextInput;
