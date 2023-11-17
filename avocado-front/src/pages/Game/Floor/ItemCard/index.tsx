import React, {useEffect} from 'react';
import ItemCardPresenter from './presenter';
import {useFloor} from '../floor.context';
import {GameItem, Item} from '../../../../models/scenario';
import scenarioCollection from '../../../../api/firebase/firestore';
import {useGame} from '../../game.context';
import {useSocket} from '../../../../context/socket.context';
import {useUser} from '../../../../context/user.context';

export type Props = {
  item: GameItem | undefined;
  minusSurveysCount: () => void;
};

const ItemCard = ({item, minusSurveysCount}: Props) => {
  const {setShowItemCard, setSurveyedItems} = useFloor();
  const {getItem} = useGame();
  const {socketRef} = useSocket();
  const {user} = useUser();

  useEffect(() => {
    const getUri = async () => {
      if (item && !item.uri.startsWith('https://')) {
        item.uri = await scenarioCollection.getImageUrl(item.uri);
      }
    };
    getUri();
  }, [item]);

  const get = () => {
    if (!item) return; // add this line to check if item is undefined
    socketRef.current?.send(`/get ${item.itemId}`);
    minusSurveysCount();
    setSurveyedItems(prev => [...prev, item.itemId]);
    getItem(item.itemId);
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
