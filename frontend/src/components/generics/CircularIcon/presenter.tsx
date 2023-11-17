import React from 'react';
import {Image} from 'react-native';
import styles from './style';

type Props = {
  url: string;
  styles: any;
};

const CircularIconPresenter = (props: Props) => {

  return (
    <Image
      source={{
        uri:
          (props.url !== null && props.url !== undefined && typeof(props.url) === 'string' && props.url !== '' ) ? props.url :
          'https://firebasestorage.googleapis.com/v0/b/avocado-test-5e236.appspot.com/o/character_icons%2Fb.png?alt=media&token=038841ca-6718-4acc-bc2b-5bb943cb9297' ,
      }}
      style={[styles.circularImage, props.styles]}
    />
  );
};

export default CircularIconPresenter;
