import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import {Abstraction, ImageType} from '../../../models/scenario';
import ImageSelector from '../../../components/generics/ImageSelector';
import ImageSelectModal from '../../../components/generics/ImageSelectModal';
import {CreateState, useCreateScenario} from '../createScenario';
import {pickSingleImageFromLocalStorage} from '../utility';

type Props = {
  targetAbstraction: Abstraction;
  onTitleChange: (text: string) => void;
  onRequiredTimeChange: (text: string) => void;
  onNumOfPlayerChange: (text: number) => void;
  onOutLineChange: (text: string) => void;
};

const OtherSettingsPresenter = ({
  onTitleChange,
  onRequiredTimeChange,
  onNumOfPlayerChange,
  onOutLineChange,
  targetAbstraction,
}: Props) => {
  const {
    setTargetImageType,
    transitNextState,
    targetId,
    abstraction,
    setAbstraction,
    targetImageURL,
    setTargetImageURL,
  } = useCreateScenario();

  const [activeTab, setActiveTab] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [isSelectedImage, setIsSelectedImage] = useState(false);

  const onPressImageWithAI = async () => {
    // TODO
    setShowModal(false);

  };

  const onPressImageFromStorage = async () => {
    const selectedUri = await pickSingleImageFromLocalStorage();

    if (!selectedUri) {
      setShowModal(false);
      return;
    }

    setAbstraction({...abstraction, thumbnail: selectedUri});
    setIsSelectedImage(true);
    setShowModal(false);
  };

  const tabs = ['2人用', '3人用', '4人用', '5人用', '6人用']; // ここにタブを追加
  return (
    <View>
      {showModal && (
        <ImageSelectModal
          test={''}
          label={'証拠品／情報の画像'}
          onPressImageWithAI={onPressImageWithAI}
          onPressImageFromStorage={onPressImageFromStorage}
        />
      )}

      <ScrollView style={styles.container}>
        {abstraction.thumbnail !== '' ? (
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}>
            <Image
              source={{uri: abstraction?.thumbnail}}
              style={styles.imageContainer}></Image>
          </TouchableOpacity>
        ) : (
          <ImageSelector
            text={'シナリオのサムネイル'}
            onPress={() => {
              setShowModal(true);
            }}
            style={styles.imageContainer}
          />
        )}

        <Text style={styles.text}>タイトル</Text>
        <TextInput
          style={styles.input}
          placeholder="タイトル"
          placeholderTextColor="#696969"
          onChangeText={onTitleChange}
          defaultValue={targetAbstraction.title}
        />

        <Text style={styles.text}>プレイ人数</Text>
        <ScrollView horizontal contentContainerStyle={styles.playerContainer}>
          {tabs.map((tab, index) => (
            <Pressable
              key={tab}
              onPress={() => {
                onNumOfPlayerChange(index + 2);
                setActiveTab(index + 2);
              }}>
              <View
                style={[
                  styles.tab,
                  activeTab === index + 2 && styles.activeTab,
                ]}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === index + 2 && styles.activeText,
                  ]}>
                  {tab}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.text}>所要時間の目安</Text>
        <View style={styles.timeRequired}>
          <TextInput
            style={[styles.input, {width: 80}]}
            placeholder="100"
            placeholderTextColor="#696969"
            defaultValue={targetAbstraction.requiredTime.toString()}
            onChangeText={onRequiredTimeChange}
          />
        </View>

        <Text style={styles.text}>あらすじ</Text>
        <TextInput
          style={[styles.input, {height: 230, marginBottom: 50}]}
          placeholderTextColor="#696969"
          multiline={true}
          defaultValue={targetAbstraction.outline}
          onChangeText={onOutLineChange}
        />
      </ScrollView>
    </View>
  );
};

export default OtherSettingsPresenter;
