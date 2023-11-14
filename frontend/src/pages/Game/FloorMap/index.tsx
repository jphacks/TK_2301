import React, {useEffect, useState} from 'react';
import FloorMapPresenter from './presenter';
import {FloorMap, GameItem, Item} from '../../../models/scenario';
import {useGame} from '../game.context';

export type FloorProps = {};

export type Props = {
  floorMaps: FloorMap[];
  numberOfSurveys: number;
};

const Floor = ({floorMaps, numberOfSurveys}: Props) => {
  const [isFloorEntered, setIsFloorEntered] = useState(false);
  const [floor, setFloor] = useState<FloorMap>();
  const [itemList, setItemList] = useState<GameItem[]>([]);
  const [surveysCount, setSurveysCount] = useState(numberOfSurveys);

  const {items} = useGame();

  const enter = (floorInfo: FloorMap) => {
    const newItemList: GameItem[] = [];
    items.map(item => {
      if (item.mapId === floorInfo.mapId) {
        newItemList.push(item);
      }
    });
    setItemList(newItemList);
    setFloor(floorInfo);
    setIsFloorEntered(true);
  };
  const exit = () => {
    console.log('exit');
    setIsFloorEntered(false);
    setFloor(undefined);
  };

  useEffect(() => {
    console.log('initial items');
    console.log(items);
  }, []);

  useEffect(() => {
    console.log('items');
    console.log(items);
  }, [items]);

  const minusSurveysCount = () => {
    setSurveysCount(surveysCount - 1);
  };
  return (
    <FloorMapPresenter
      floorMaps={floorMaps}
      itemList={itemList}
      enter={enter}
      isFloorEntered={isFloorEntered}
      floor={floor}
      exit={exit}
      surveysCount={surveysCount}
      numberOfSurveys={numberOfSurveys}
      minusSurveysCount={minusSurveysCount}
    />
  );
};

export default Floor;
