import React from 'react';
import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import SquareButton from '../SquareButton';
import styles from './style';
import {useCreateScenario} from '../createScenario';

type Props = {
  onPress: (type: string) => void;
};

const CharacterSheetPresenter = ({onPress}: Props) => {
  const {editingCharacter, setEditingCharacter} = useCreateScenario();
  return (
    <View style={styles.container}>
      <SquareButton type="ai" onPress={onPress} />
      <ScrollView>
        <View style={styles.characterNameForm}>
          <Image source={require('./cameraIcon.png')} />
          <TextInput
            style={[styles.input, styles.nameInput]}
            placeholder="キャラクター名"
            placeholderTextColor="#888888"
            value={editingCharacter?.name}
            onChangeText={text => {
              setEditingCharacter({
                ...editingCharacter!,
                name: text,
              });
            }}
          />
        </View>

        <Text style={styles.label}>キャラクターの公開情報</Text>
        <TextInput
          style={[styles.input, styles.openInput]}
          placeholderTextColor="#888888"
          value={editingCharacter?.public_info}
          onChangeText={text => {
            setEditingCharacter({
              ...editingCharacter!,
              public_info: text,
            });
          }}
        />

        <Text style={styles.label}>キャラクターの非公開情報</Text>
        <TextInput
          style={[styles.input, styles.privateInput]}
          placeholderTextColor="#888888"
          value={editingCharacter?.private_info}
          onChangeText={text => {
            setEditingCharacter({
              ...editingCharacter!,
              private_info: text,
            });
          }}
        />

        <Text style={styles.label}>事件当日のタイムライン</Text>
        <TextInput
          style={[styles.input, styles.timelineInput]}
          placeholderTextColor="#888888"
          value={editingCharacter?.timeline.map(t => t.text).join('\n')}
          onChangeText={text => {
            setEditingCharacter({
              ...editingCharacter!,
              timeline: text.split('\n').map((t, i) => ({num: i, text: t})),
            });
          }}
        />

        <Text style={styles.label}>キャラクターの行動目標</Text>
        <TextInput
          style={[styles.input, styles.purposeInput]}
          placeholderTextColor="#888888"
          value={editingCharacter?.purpose}
          onChangeText={text => {
            setEditingCharacter({
              ...editingCharacter!,
              purpose: text,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

export default CharacterSheetPresenter;
