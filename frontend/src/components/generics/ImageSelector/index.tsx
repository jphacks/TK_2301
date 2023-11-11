import React, {useState} from "react";
import ImageSelectorPresenter from "./presenter";

export type Props = {
  text: string;
  onPress: () => void;
  style?: any;
};

const ImageSelector = ({text, style, onPress}: Props) => {
  return <ImageSelectorPresenter text={text} style={style} onPress={onPress} url={undefined} />;
};

export default ImageSelector;
