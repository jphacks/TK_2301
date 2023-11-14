import React, {useEffect, useState} from 'react';
import FloorPresenter from './presenter';
import {FloorProvider} from './floor.context';
import {FloorMap, Item} from '../../../models/scenario';
import scenarioCollection from '../../../api/firebase/firestore';

export type Props = {
  floor: FloorMap;
  itemList: Item[];
  surveysCount: number;
  minusSurveysCount: () => void;
};

const Floor = ({floor, itemList, surveysCount, minusSurveysCount}: Props) => {
  useEffect(() => {
    const getUri = async () => {
      floor.uri = await scenarioCollection.getImageUrl(floor.uri);
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
