import React from 'react';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import styles from './style';
import PrimaryButton from '../../../components/generics/PrimaryButton';
import {RadioButton} from 'react-native-paper';

type Props = {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  next: () => void;
};

const ItemInfoPresenter = ({showModal, openModal, closeModal, next}: Props) => {
  const [checked, setChecked] = React.useState('first');
  return (
    <View>
      {showModal && (
        <View style={{alignItems: 'center', zIndex: 30}}>
          <View style={styles.modalContainer}>
            <Pressable style={styles.closeIcon} onPress={closeModal}>
              <Image source={require('./close.png')} />
            </Pressable>
            <Text style={styles.modalText}>証拠品／情報の画像</Text>
            <PrimaryButton text="AIで作成" onPress={next} width={238} />
          </View>
        </View>
      )}
      <View
        style={[
          styles.container,
          showModal ? {opacity: 0.5, backgroundColor: '#000'} : null,
        ]}>
        <Pressable onPress={openModal}>
          <Image style={styles.image} source={require('./upload.png')} />
        </Pressable>

        <Text style={styles.label}>証拠品／情報の名前</Text>
        <TextInput
          style={[styles.input]}
          placeholder="証拠品／情報の名前"
          placeholderTextColor="#888888"
        />

        <Text style={styles.label}>証拠品／情報の説明</Text>
        <TextInput
          style={[styles.input]}
          placeholder="証拠品／情報の名前"
          placeholderTextColor="#888888"
        />

        <Text style={styles.label}>証拠品／情報の説明</Text>
        <RadioButton.Item
          value="item"
          label="物品"
          status={checked === 'shop2' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('item');
          }}
        />
        <RadioButton.Item
          value="info"
          label="情報"
          status={checked === 'shop2' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('info');
          }}
        />
      </View>
    </View>
  );
};

export default ItemInfoPresenter;
