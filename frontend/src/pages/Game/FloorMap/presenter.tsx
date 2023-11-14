import React from 'react';
import {Pressable, Text, View, Image} from 'react-native';
import {Props as ContainerProps, FloorProps} from './index';
import styles from './style';
import Floor from '../Floor';
import {FloorMap, GameItem, Item} from '../../../models/scenario';

type Props = {
  enter: (floorInfo: FloorMap) => void;
  floor: FloorMap | undefined;
  isFloorEntered: boolean;
  exit: () => void;
  surveysCount: number;
  minusSurveysCount: () => void;
  itemList: GameItem[];
} & ContainerProps;

const FloorMapPresenter = ({
  floorMaps,
  itemList,
  enter,
  isFloorEntered,
  floor,
  exit,
  surveysCount,
  minusSurveysCount,
}: Props) => {
  return (
    <View>
      <View style={styles.header}>
        {isFloorEntered && (
          <Pressable onPress={exit} style={styles.backContainer}>
            <Image style={styles.backIcon} source={require('./back.png')} />
          </Pressable>
        )}
        <Text style={styles.where}>
          {isFloorEntered && floor ? floor?.name : 'フロアマップ'}
        </Text>
      </View>

      {isFloorEntered && floor ? (
        <Floor
          floor={floor}
          itemList={itemList}
          surveysCount={surveysCount}
          minusSurveysCount={minusSurveysCount}
        />
      ) : (
        <>
          {floorMaps.map((floor, index) => {
            return (
              <Pressable
                key={index}
                style={styles.container}
                onPress={() => enter(floor)}>
                <Text style={styles.text}>{floor.name}</Text>
                <Image source={require('./enter.png')} />
              </Pressable>
            );
          })}
        </>
      )}
    </View>
  );
};

export default FloorMapPresenter;
