import React from 'react';
import SurveyCardPresenter from './presenter';
import {useFloor} from '../floor.context';
import {GameItem, Item} from '../../../../models/scenario';

export type Props = {
  item: GameItem | undefined;
  surveysCount: number;
};

const SurveyCard = ({item, surveysCount}: Props) => {
  const {setShowSurveyCard, setShowItemCard, setItemId} = useFloor();
  const showItem = () => {
    setShowSurveyCard(false);
    setShowItemCard(true);
  };
  const close = () => {
    setShowSurveyCard(false);
  };
  return (
    <SurveyCardPresenter
      item={item}
      surveysCount={surveysCount}
      showItem={showItem}
      close={close}
    />
  );
};

export default SurveyCard;
