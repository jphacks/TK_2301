import React from 'react';
import {Text, View} from 'react-native';
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
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      {isNone ? (
        <Text style={styles.mainText}>この中に犯人はいない</Text>
      ) : (
        <View style={styles.characterContainer}>
          <CircularIcon
            styles={styles.icon}
            url={character?.icon}></CircularIcon>
          <Text
            style={
              styles.mainText
            }>{`${character?.name} (${character?.age})`}</Text>
          {forPlayingGame && (
            <PurpleCheckIcon isChecked={isSelected || false} />
          )}
        </View>
      )}
    </View>
  );
};

export default CharacterVoteButtonPresenter;
