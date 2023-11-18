import React, {useEffect, useState} from 'react';
import FloorPresenter from './presenter';
import {FloorProvider} from './floor.context';
import {FloorMap, GameItem, Item} from '../../../models/scenario';
import {createScenarioFirestore} from '../../../api/firebase/firestore';
import {useGame} from '../game.context';

export type Props = {
  floor: FloorMap;
  itemList: GameItem[];
  surveysCount: number;
  minusSurveysCount: () => void;
};

const Floor = ({floor, itemList, surveysCount, minusSurveysCount}: Props) => {
  useEffect(() => {
    const getUri = async () => {
      floor.uri = await createScenarioFirestore().getImageUrl(floor.uri);
    };
    getUri();
  }, [floor]);
  return (
    <FloorProvider>
      <FloorPresenter
        itemList={itemList}
        floor={floor}
        surveysCount={surveysCount}
        minusSurveysCount={minusSurveysCount}
      />
    </FloorProvider>
  );
};

export default Floor;
