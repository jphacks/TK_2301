import React, {useState} from 'react';
import QuestionPresenter from './presenter';
import {useFloor} from '../floor.context';
import {GameItem, Item} from '../../../../models/scenario';
import {Dimensions} from 'react-native';

type Props = {
  item: GameItem;
};

const QuestionIcon = ({item}: Props) => {
  const {width, height} = Dimensions.get('window');

  const {showSurveyCard, setShowSurveyCard, setItemId} = useFloor();
  const [position, setPosition] = useState({
    top: width * item.coordinate.x,
    left: height * item.coordinate.y + 40,
  });

  const show = () => {
    console.log(item);
    setShowSurveyCard(true);
    setItemId(item.itemId);
  };

  const hide = () => {
    setShowSurveyCard(false);
  };
  return (
    <QuestionPresenter
      position={position}
      show={show}
      hide={hide}
      itemId={item.itemId}
    />
  );
};

export default QuestionIcon;
