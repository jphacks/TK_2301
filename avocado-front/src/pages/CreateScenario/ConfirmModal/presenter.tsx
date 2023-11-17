import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';
import PrimaryButton from '../../../components/generics/PrimaryButton';
import {useCreateScenario} from '../createScenario';

type Props = {} & ContainerProps;

const ConfirmModalPresenter = ({
  onPressConfirm,
  titleTextContent,
  buttonTextContent,
}: Props) => {
  const {isConfirm, setIsConfirm} = useCreateScenario();
  return (
    isConfirm && (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirm}
        >
        <TouchableOpacity style={styles.modalView} onPress={() => {setIsConfirm(false)}}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeaderText}>{titleTextContent}</Text>
            <Text style={styles.modalText}>確認はできましたか？</Text>
            <PrimaryButton
              text={buttonTextContent}
              onPress={onPressConfirm}
              width={238}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    )
  );
};

export default ConfirmModalPresenter;
