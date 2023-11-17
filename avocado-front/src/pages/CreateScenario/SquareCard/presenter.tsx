import React, {useState} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import ConfirmDeleteModal from '../ConfirmDeleteModal';

type Props = {} & ContainerProps;

const SquareCardPresenter = ({
  label,
  onPress,
  style,
  onPressDots,
  deleteFunction,
}: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {showDeleteModal && (
        <ConfirmDeleteModal
          deleteTarget={label || ''}
          onPressConfirm={deleteFunction}
          onPressCancel={() => setShowDeleteModal(false)}
          visible={showDeleteModal}
        />
      )}
      <View>
        <Text style={styles.main}>{label}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setShowDeleteModal(true);
        }}>
        <Entypo name="dots-three-horizontal" color={'white'} size={16}></Entypo>
      </TouchableOpacity>
    </Pressable>
  );
};

export default SquareCardPresenter;
