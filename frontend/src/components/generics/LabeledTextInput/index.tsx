import React from "react";
import LabeledTextInputPresenter from "./presenter";

export type Props = {
  labelName: string;
  placeholder?: string;
  style?: any
};

const LabeledTextInput = ({ labelName, placeholder, style }: Props) => {
  return (
    <LabeledTextInputPresenter
      placeholder={placeholder}
      labelName={labelName}
      style={style}
    />
  );
};

export default LabeledTextInput;
