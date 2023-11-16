import React from "react";
import ImageSelectModalPresenter from "./presenter";

export type Props = {
  label: string;
  test: string;
  
  onPressImageWithAI:() => void
  onPressImageFromStorage: () => void;
};

const ImageSelectModal = ({test, label, onPressImageFromStorage, onPressImageWithAI}: Props) => {
  return <ImageSelectModalPresenter label={label} test={test} url={undefined} onPressImageFromStorage={onPressImageFromStorage} onPressImageWithAI={onPressImageWithAI} />;
};

export default ImageSelectModal;
