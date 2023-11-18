import React, {useEffect, useState} from 'react';
import AcquiredItemsPresenter from './presenter';
import {useGame} from '../../game.context';
import Game from '../..';
import {Character, GameItem} from '../../../../models/scenario';

export type Props = {
  scenarioCharacters: Character[];
};

const AcquiredItems = ({scenarioCharacters}: Props) => {
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
      scenarioCharacters={scenarioCharacters}
    />
  );
};

export default AcquiredItems;
