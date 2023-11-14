import React, {useState} from 'react';
import FloorMapPresenter from './presenter';
import {FloorMap, Item} from '../../../models/scenario';

export type FloorProps = {};

export type Props = {
  floorMaps: FloorMap[];
  items: Item[];
  numberOfSurveys: number;
};

const Floor = ({floorMaps, numberOfSurveys, items}: Props) => {
  const [isFloorEntered, setIsFloorEntered] = useState(false);
  const [floor, setFloor] = useState<FloorMap>();
  const [itemList, setItemList] = useState<Item[]>([]);
  const [surveysCount, setSurveysCount] = useState(numberOfSurveys);
  const enter = (floorInfo: FloorMap) => {
    const newItemList: Item[] = [];
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

  const minusSurveysCount = () => {
    setSurveysCount(surveysCount - 1);
  };
  return (
    <FloorMapPresenter
      floorMaps={floorMaps}
      items={items}
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
