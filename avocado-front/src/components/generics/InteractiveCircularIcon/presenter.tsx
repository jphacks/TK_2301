import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import CircularIcon from '../CircularIcon';

type Props = {
  name: string;
  url: any;
  style?: any;
  isCirculated: boolean;
  isFetched?: boolean;
};

const InteractiveCircularIconPresenter = ({
  name,
  url,
  style,
  isCirculated,
  isFetched,
}: Props) => {
  return (
    <>
      {isFetched && (
        <View style={[styles.container, style]}>
          <View style={isCirculated && styles.interactiveLing}>
            <CircularIcon url={url} styles={style} />
          </View>
          <View>
            <Text style={styles.text}>{name}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default InteractiveCircularIconPresenter;
