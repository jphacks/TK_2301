import React from 'react';
import LabeledTextInputPresenter from './presenter';

export type Props = {
  labelName: string;
  placeholder?: string;
  style?: any;
  onTextChange?: (text: string) => void;
  defaultValue?: string;
};

const LabeledTextInput = ({
  labelName,
  placeholder,
  style,
  onTextChange,
  defaultValue,
}: Props) => {
  return (
    <LabeledTextInputPresenter
      placeholder={placeholder}
      labelName={labelName}
      style={style}
      onTextChange={onTextChange}
      defaultValue={defaultValue}
    />
  );
};

export default LabeledTextInput;
