import React, {useEffect} from 'react';
import ItemCardPresenter from './presenter';
import {GameItem, Item} from '../../../../../models/scenario';
import scenarioCollection from '../../../../../api/firebase/firestore';

export type Props = {
  item: GameItem | undefined;
  setShowMyItem: React.Dispatch<React.SetStateAction<boolean>>;
};

const ItemCard = ({item, setShowMyItem}: Props) => {
  useEffect(() => {
    const getUri = async () => {
      if (item && !item.uri.startsWith('https://')) {
        item.uri = await scenarioCollection.getImageUrl(item.uri);
      }
    };
    getUri();
  }, [item]);

  const get = () => {};
  const close = () => {
    setShowMyItem(false);
  };
  return (
    <ItemCardPresenter
      item={item}
      get={get}
      close={close}
      setShowMyItem={setShowMyItem}
    />
  );
};

export default ItemCard;
