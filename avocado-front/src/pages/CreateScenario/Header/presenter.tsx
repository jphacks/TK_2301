import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from './style';
import {useCreateScenario} from '../createScenario';
import UploadingModal from '../UploadingModal';

type Props = {
  back: () => void;
  text: string;
  onPressUploadIcon: () => void;
};

const HeaderPresenter = ({back, text, onPressUploadIcon}: Props) => {
  const {setIsConfirm} = useCreateScenario();

  return (
    <View style={styles.header}>
      <UploadingModal textContent={'保存中...'} />
      <Pressable onPress={back} style={styles.backContainer}>
        <Image style={styles.backIcon} source={require('./back.png')} />
      </Pressable>

      <Text style={styles.where}>{text}</Text>

      <Pressable
        onPress={() => {
          setIsConfirm(true);
        }}
        style={styles.uploadIconContainer}>
        <Image style={styles.backIcon} source={require('./upload.png')} />
      </Pressable>
    </View>
  );
};

export default HeaderPresenter;
