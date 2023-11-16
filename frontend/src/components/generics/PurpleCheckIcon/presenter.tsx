import React from 'react';
import {View} from 'react-native';
import {Props as ContainerProps} from './index';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './style';

type Props = {} & ContainerProps;

const PurpleCheckIconPresenter = ({isChecked}: Props) => {
  return (
    <View>
      {isChecked ? (
        <View>
          {/* 背景の白色 */}
          <View style={styles.iconBackground} />
          <Icon name="checkcircle" color={'#5865F2'} size={25}></Icon>
        </View>
      ) : (
        <View style={styles.notSelectedIcon} />
      )}
    </View>
  );
};

export default PurpleCheckIconPresenter;
