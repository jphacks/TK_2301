import React, {useEffect, useState} from 'react';
import AcquiredItemsPresenter from './presenter';
import {useGame} from '../../game.context';
import scenarioCollection from '../../../../api/firebase/firestore';
import Game from '../..';
import {GameItem} from '../../../../models/scenario';

const AcquiredItems = () => {
  console.log('AcquiredItems rendering');
  const {myItems, items} = useGame();
  const [reshapedMyItems, setReshapedMyItems] = useState<GameItem[]>([]);
  const [showMyItem, setShowMyItem] = useState(false);
  const [item, setItem] = useState<GameItem | undefined>(undefined);
  useEffect(() => {
    myItems.forEach(myItem => {
      const item = items.find(item => item.itemId === myItem);
      if (item) {
        setReshapedMyItems(prev => [...prev, item]);
      }
    });
  }, [myItems]);

  const onPress = (item: GameItem) => {
    setShowMyItem(true);
    setItem(item);
  };

  return (
    <AcquiredItemsPresenter
      onPress={onPress}
      reshapedMyItems={reshapedMyItems}
      showMyItem={showMyItem}
      item={item}
      setShowMyItem={setShowMyItem}
    />
  );
};

export default AcquiredItems;
