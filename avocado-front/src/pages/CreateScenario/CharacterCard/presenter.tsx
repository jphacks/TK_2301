import React, {useState} from 'react';
import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import ConfirmDeleteModal from '../ConfirmDeleteModal';

type Props = {
  onPress: () => void;
} & ContainerProps;

const CharacterCardPresenter = ({
  character,
  type,
  onPress,
  deleteFunction,
}: Props) => {
  const {name, age, profession, public_info} = character;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {showDeleteModal && (
        <ConfirmDeleteModal
          deleteTarget={character.name || ''}
          onPressConfirm={deleteFunction}
          onPressCancel={() => setShowDeleteModal(false)}
          visible={showDeleteModal}
        />
      )}
      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {name} ({age})
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowDeleteModal(true);
          }}>
          <Entypo
            name="dots-three-horizontal"
            color={'white'}
            size={16}></Entypo>
        </TouchableOpacity>
      </View>
      <View style={styles.descriptionContainer}>
        <View>
          <Text style={styles.profession}>職業: {profession}</Text>
          <Text style={styles.description}>{public_info}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CharacterCardPresenter;
