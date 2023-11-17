import React, {useState} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {Props as ContainerProps} from './index';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {} & ContainerProps;

const PhaseCardPresenter = ({phase, onPress, deleteFunction}: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {showDeleteModal && (
        <ConfirmDeleteModal
          deleteTarget={phase.name || ''}
          onPressConfirm={deleteFunction}
          onPressCancel={() => setShowDeleteModal(false)}
          visible={showDeleteModal}
        />
      )}
      <View style={{}}>
        <Text style={styles.name}>{!phase.name ? 'hoge' : phase.name}</Text>
        <Text style={styles.numberOfSurveys}>
          調査可能な回数 {phase.numberOfSurveys}回
        </Text>
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

export default PhaseCardPresenter;
