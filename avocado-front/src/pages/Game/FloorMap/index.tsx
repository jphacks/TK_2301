import React, {useEffect, useState} from 'react';
import FloorMapPresenter from './presenter';
import {FloorMap, GameItem, Item} from '../../../models/scenario';
import {useGame} from '../game.context';
import {useSocket} from '../../../context/socket.context';

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
  const {socketRef} = useSocket();

  const {
    items,
    mapMovementLock,
    setMapMovementLock,
    setIsShowLockModal,
    lockTime,
    setLockTime,
    lockTimer,
    setLockTimer,
    setNowMapId,
  } = useGame();

  useEffect(() => {
    if (lockTime <= 0 && lockTimer) {
      clearInterval(lockTimer);
      setMapMovementLock(false);
      setIsShowLockModal(false);
      setLockTimer(null);
      setLockTime(60);
    }
  }, [lockTime]);

  const enter = (floorInfo: FloorMap) => {
    socketRef.current?.send(`/enter ${floorInfo.mapId}`);
    const newItemList: GameItem[] = [];
    items.map(item => {
      if (item.mapId === floorInfo.mapId) {
        newItemList.push(item);
      }
    });
    setItemList(newItemList);
    setFloor(floorInfo);
    setIsFloorEntered(true);
    setMapMovementLock(true); // 部屋移動のロック
    setNowMapId(floorInfo.mapId);

    const intervalId = setInterval(() => {
      setLockTime(prev => prev - 1);
    }, 1000);
    setLockTimer(intervalId);
  };
  const exit = (floorInfo: FloorMap) => {
    if (mapMovementLock) {
      setIsShowLockModal(true);
      return;
    }
    console.log('exit');
    socketRef.current?.send(`/exit ${floorInfo.mapId}`);
    setIsFloorEntered(false);
    setFloor(undefined);
  };

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
