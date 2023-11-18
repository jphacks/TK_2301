import React from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {useCreateScenario} from '../createScenario';
import UploadingModal from '../UploadingModal';
import BackIcon from 'react-native-vector-icons/Entypo';
import UploadIcon from 'react-native-vector-icons/Ionicons';

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
      <TouchableOpacity onPress={back}>
        <BackIcon name="chevron-left" color={'white'} size={25} />
      </TouchableOpacity>

      <Text style={styles.where}>{text}</Text>

      <TouchableOpacity
        onPress={() => setIsConfirm(true)}
        style={styles.uploadIconContainer}>
        <UploadIcon name="cloud-upload-outline" color={'white'} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderPresenter;
