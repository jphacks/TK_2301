import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {RadioButton} from 'react-native-paper';
import LabeledTextInput from '../../../components/generics/LabeledTextInput';
import ImageSelectModal from '../../../components/generics/ImageSelectModal';
import ImageSelector from '../../../components/generics/ImageSelector';
import {Item, ItemCategory} from '../../../models/scenario';
import {useCreateScenario} from '../createScenario';

type Props = {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  next: () => void;
  targetId: string | undefined;
  onItemNameTextChange: (name: string) => void;
  onItemDescriptionTextChange: (description: string) => void;
  handleRadioButtonPress: (value: ItemCategory) => void;
  onPressImageWithAI: () => void;
  onPressImageFromStorage: () => void;
  isSelectedImage: boolean;
  itemType: ItemCategory;
  targetItem?: Item;
};

const ItemInfoPresenter = ({
  showModal,
  openModal,
  onItemNameTextChange,
  onItemDescriptionTextChange,
  handleRadioButtonPress,
  onPressImageFromStorage,
  onPressImageWithAI,
  itemType,
  targetItem,
}: Props) => {
  const {items, targetId, targetImageURL} = useCreateScenario();

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

      <View
        style={[
          styles.container,
          showModal ? {opacity: 0.5, backgroundColor: '#000'} : null,
        ]}>
        {targetImageURL !== '' ? (
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>

            {/* ================ 表示画像 ==================== */}
            <TouchableOpacity onPress={openModal}>
              <ImageBackground
                source={{uri: targetImageURL}}
                style={styles.selectedImage}></ImageBackground>
            </TouchableOpacity>
          </View>
        ) : (
          <ImageSelector onPress={openModal} text={''} style={{height: 200}} />
        )}

        <LabeledTextInput
          labelName={'証拠品／情報の名前'}
          style={styles.labeledInputText}
          defaultValue={items.get(targetId || '')?.name}
          onTextChange={onItemNameTextChange}
        />
        <LabeledTextInput
          labelName={'証拠品／情報の説明'}
          style={styles.labeledInputText}
          defaultValue={targetItem?.description}
          onTextChange={onItemDescriptionTextChange}
        />

        <Text style={styles.label}>証拠品／情報の説明</Text>
        <RadioButton.Group
          onValueChange={value => {
            console.log(value);
            handleRadioButtonPress(value as ItemCategory);
          }}
          value={itemType}>
          <RadioButton.Item
            value="item"
            label="証拠品"
            labelStyle={styles.radioLabelStyle}
            status={itemType === 'item' ? 'checked' : 'unchecked'}
            color="#3DD6DD"
          />
          <RadioButton.Item
            value="info"
            label="情報"
            labelStyle={styles.radioLabelStyle}
            color="#3DD6DD"
            status={itemType === 'info' ? 'checked' : 'unchecked'}
          />
        </RadioButton.Group>
      </View>
    </View>
  );
};

export default ItemInfoPresenter;
