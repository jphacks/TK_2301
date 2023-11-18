import React from 'react';
import {Image, ImageBackground, Pressable, Text, View} from 'react-native';
import styles from './style';
import QuestionIcon from './QuesctionIcon';
import {useFloor} from './floor.context';
import SurveyCard from './SurveyCard';
import ItemCard from './ItemCard';
import {useGame} from '../game.context';
import {Props as ContainerProps} from './index';

type Props = {} & ContainerProps;

const FloorPresenter = ({
  floor,
  itemList,
  surveysCount,
  minusSurveysCount,
}: Props) => {
  const {showSurveyCard, showItemCard, itemId} = useFloor();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: floor.uri}}
        style={styles.background}
        resizeMode="cover">
        {itemList.map((item, index) => {
          return <QuestionIcon key={index} item={item} />;
        })}

        {showSurveyCard && itemId && (
          // floor.itemsの中からitemIdと一致するitemを探す
          <SurveyCard
            item={itemList.find(item => item.itemId === itemId)}
            surveysCount={surveysCount}
          />
        )}

        {showItemCard && itemId && (
          <ItemCard
            item={itemList.find(item => item.itemId === itemId)}
            minusSurveysCount={minusSurveysCount}
          />
        )}
      </ImageBackground>
    </View>
  );
};

export default FloorPresenter;
