import React from "react";
import SquareCardPresenter from "./presenter";

export type Props = {
  id: number | string;
  label?: string;
  onPress: () => void;
  style?: any;
};

const SquareCard = ({id, label, onPress, style}: Props) => {
  return <SquareCardPresenter label={label} id={id} onPress={onPress} style={style} />;
};

export default SquareCard;
