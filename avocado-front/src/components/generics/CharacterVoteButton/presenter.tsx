import React from 'react';
import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {Props as ContainerProps} from './index';
import styles from './style';
import CircularIcon from '../CircularIcon';
import Icon from 'react-native-vector-icons/AntDesign';
import PurpleCheckIcon from '../PurpleCheckIcon';

type Props = {} & ContainerProps;

const CharacterVoteButtonPresenter = ({
  character,
  forPlayingGame,
  isSelected,
  style,
  isNone,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {isNone ? (
        <Text style={styles.mainText}>この中に犯人はいない</Text>
      ) : (
        <View style={styles.characterContainer}>
          <View style={styles.characterInfo}>
            <CircularIcon
              styles={styles.icon}
              url={character?.icon}></CircularIcon>
            <Text
              style={
                styles.mainText
              }>{`${character?.name} (${character?.age})`}</Text>
          </View>

          {forPlayingGame && (
            <PurpleCheckIcon isChecked={isSelected || false} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CharacterVoteButtonPresenter;
