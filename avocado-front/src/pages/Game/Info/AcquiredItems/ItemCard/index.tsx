import React, {useEffect} from 'react';
import ItemCardPresenter from './presenter';
import {GameItem, Item} from '../../../../../models/scenario';
import {createScenarioFirestore} from '../../../../../api/firebase/firestore';
import {useGame} from '../../../game.context';

export type Props = {
  item: GameItem | undefined;
  setShowMyItem: React.Dispatch<React.SetStateAction<boolean>>;
};

const ItemCard = ({item, setShowMyItem}: Props) => {
  useEffect(() => {
    const getUri = async () => {
      if (item && !item.uri.startsWith('https://')) {
        item.uri = await createScenarioFirestore().getImageUrl(item.uri);
      }
    };
    getUri();
  }, [item]);

  const {setTransferableItem, setIsShowSelectTransferredCharacters} = useGame();

  const get = () => {
    setTransferableItem(item);
    setIsShowSelectTransferredCharacters(true);
    setShowMyItem(false);
  };
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
