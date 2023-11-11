import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SquareButton from '../SquareButton';
import styles from './style';
import {useCreateScenario} from '../createScenario';
import ImageSelectModal from '../../../components/generics/ImageSelectModal';
import CircularIcon from '../../../components/generics/CircularIcon';

type Props = {
  showImageSelectModal: boolean;
  onPress: (type: string) => void;
  openImageSelectModal: () => void;
  onPressImageWithAI: () => void;
  onPressImageFromStorage: () => void;
};

const CharacterSheetPresenter = ({
  onPress,
  showImageSelectModal,
  openImageSelectModal,
  onPressImageFromStorage,
  onPressImageWithAI,
}: Props) => {
  const {editingCharacter, setEditingCharacter, targetImageURL} =
    useCreateScenario();
  return (
    <View style={styles.container}>
      {showImageSelectModal && (
        <ImageSelectModal
          test={''}
          label={'証拠品／情報の画像'}
          onPressImageWithAI={onPressImageWithAI}
          onPressImageFromStorage={onPressImageFromStorage}
        />
      )}

      <SquareButton type="ai" onPress={onPress} />
      <ScrollView>
        <View style={styles.characterNameForm}>
          <TouchableOpacity onPress={openImageSelectModal} style={styles.icon}>
            {editingCharacter?.icon === '' ? (
              <Image source={require('./cameraIcon.png')} />
            ) : (
              <CircularIcon url={{uri: targetImageURL}} />
            )}
          </TouchableOpacity>
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
