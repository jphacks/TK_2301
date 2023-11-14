import React, {useEffect} from 'react';
import ItemCardPresenter from './presenter';
import {useFloor} from '../floor.context';
import {GameItem, Item} from '../../../../models/scenario';
import scenarioCollection from '../../../../api/firebase/firestore';

export type Props = {
  item: GameItem | undefined;
  minusSurveysCount: () => void;
};

const ItemCard = ({item, minusSurveysCount}: Props) => {
  const {setShowItemCard, setSurveyedItems} = useFloor();

  useEffect(() => {
    const getUri = async () => {
      if (item) {
        item.uri = await scenarioCollection.getImageUrl(item.uri);
      }
    };
    getUri();
  }, [item]);

  const get = () => {
    minusSurveysCount();
    setSurveyedItems(prev => [...prev, item?.itemId ?? '']);
    setShowItemCard(false);
  };
  const close = () => {
    setShowItemCard(false);
  };
  return (
    <ItemCardPresenter
      item={item}
      get={get}
      close={close}
      minusSurveysCount={minusSurveysCount}
    />
  );
};

export default ItemCard;
