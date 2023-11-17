import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';
import PrimaryButton from '../../../components/generics/PrimaryButton';
import {useCreateScenario} from '../createScenario';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {} & ContainerProps;

const CompletedModalPresenter = ({}: Props) => {
  const {isCompleteUpload, setIsCompleteUpload} = useCreateScenario();
  return (
    isCompleteUpload && (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCompleteUpload}>
        <TouchableOpacity
          style={styles.modalView}
          onPress={() => {
            setIsCompleteUpload(false);
          }}>
          <Icon name="checkcircle" color={'#23A68E'} size={50}></Icon>

          <Text style={styles.modalText}>保存が完了しました</Text>
        </TouchableOpacity>
      </Modal>
    )
  );
};

export default CompletedModalPresenter;
