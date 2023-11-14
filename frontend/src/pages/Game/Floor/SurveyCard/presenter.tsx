import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';
import PrimaryButton from '../../../../components/generics/PrimaryButton';
import {useFloor} from '../floor.context';

type Props = {
  showItem: () => void;
  close: () => void;
} & ContainerProps;

const SurveyCardPresenter = ({item, surveysCount, showItem, close}: Props) => {
  const {surveyedItems} = useFloor();
  const renderContent = () => {
    console.log(item?.isAvailable);
    if (!item?.isAvailable) {
      <View>
        <Text style={styles.text}>他の人がすでに取得しました</Text>
      </View>;
    } else if (surveysCount === 0) {
      return (
        <View>
          <Text style={styles.text}>調査回数が0回になりました</Text>
        </View>
      );
    } else if (item && surveyedItems.includes(item.itemId)) {
      return (
        <View>
          <Text style={styles.text}>すでに調査済みです</Text>
        </View>
      );
    } else if (surveysCount > 0) {
      return (
        <View>
          <Text style={styles.countText}>残り{surveysCount}回</Text>
          <Text style={styles.text}>まで証拠品を調査できます</Text>
          <PrimaryButton text="調査する" onPress={showItem} width={238} />
        </View>
      );
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.container}>
        <Pressable onPress={close} style={styles.close}>
          <Image source={require('./close.png')} />
        </Pressable>

        {renderContent()}
      </View>
    </View>
  );
};

export default SurveyCardPresenter;
