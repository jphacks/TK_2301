import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';
import CircularIcon from '../../../components/generics/CircularIcon';
import InteractiveCircularIcon from '../../../components/generics/InteractiveCircularIcon';
import {useUser} from '../../../context/user.context';

type Props = {
  onPress: (characterName: string) => void;
  selectedUserId?: string;
} & ContainerProps;

const SelectCharacterCardPresenter = ({
  character,
  selectedUserId,
  onPress,
}: Props) => {
  const {user} = useUser();
  const {icon, name, age, profession, public_info} = character;
  return (
    <Pressable style={styles.container} onPress={() => onPress(character.name)}>
      <View style={styles.nameContainer}>
        <CircularIcon url={icon} />
        <Text style={styles.name}>
          {name}({age})
        </Text>
        {selectedUserId && (
          <View>
            <InteractiveCircularIcon
              id={selectedUserId}
              style={styles.selectedUserIcon}
              isCirculated={false}
              name={''}
            />
            {/* <CircularIcon
              url={selectedUserId}
              styles={styles.selectedUserIcon}
            /> */}
          </View>
        )}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.profession}>職業: {profession}</Text>
        <Text style={styles.description}>{[public_info]}</Text>
      </View>
    </Pressable>
  );
};

export default SelectCharacterCardPresenter;
