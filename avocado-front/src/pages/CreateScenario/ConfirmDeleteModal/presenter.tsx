import React from 'react';
import {Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';
import PrimaryButton from '../../../components/generics/PrimaryButton';
import {useCreateScenario} from '../createScenario';
import LinearGradient from 'react-native-linear-gradient';

type Props = {} & ContainerProps;

const ConfirmDeleteModalPresenter = ({
  onPressConfirm,
  deleteTarget,
  onPressCancel,
  visible,
}: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableOpacity
        style={styles.modalView}
        onPress={() => {
          onPressCancel();
        }}>
        <View style={styles.modalContainer}>
          <Text style={styles.deleteTargetText}>{deleteTarget}</Text>
          <Text style={styles.modalHeaderText}>を削除してもよろしいですか</Text>
          <View style={[styles.buttonWrapContainer]}>
            <Pressable
              onPress={() => {
                onPressCancel();
                onPressConfirm();
              }}>
              <LinearGradient
                colors={['#db3030', '#f75757']}
                start={{x: 1, y: 0}}
                end={{x: 1, y: 1}}
                style={[styles.buttonContainer]}>
                <Text style={styles.text}>削除する</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmDeleteModalPresenter;
