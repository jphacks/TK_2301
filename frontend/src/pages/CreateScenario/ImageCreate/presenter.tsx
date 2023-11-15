import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './style';
import PrimaryButton from '../../../components/generics/PrimaryButton';
import {ItemImageCandidate} from '../../../models/scenario';
import Spinner from 'react-native-loading-spinner-overlay';
import FetchingModal from '../FetchingModal';

type Props = {
  onChangeText: (text: string) => void;
  onPress: () => void;
  image: string;
  showItemModal: boolean;
  fetchedImage: boolean;
  itemImageCandidate: ItemImageCandidate[] | undefined;
  candidateImageUri: string[];
  focusedImageUri: string;
  setFocusedImageUri: React.Dispatch<React.SetStateAction<string>>;
  onPressDecideImage: () => void;
};

const ImageCreatePresenter = ({
  onChangeText,
  onPress,
  image,
  fetchedImage,
  candidateImageUri,
  focusedImageUri,
  setFocusedImageUri,
  onPressDecideImage,
}: Props) => {
  return (
    <View style={styles.container}>
      <FetchingModal textContent={'生成中...'} />

      {fetchedImage && (
        <View style={styles.proposedImageContainer}>
          {candidateImageUri.map(uri => {
            return (
              <TouchableOpacity
                key={uri}
                onPress={() => {
                  setFocusedImageUri(uri);
                }}>
                <Image
                  key={uri}
                  style={[
                    styles.proposedImage,
                    {borderWidth: focusedImageUri === uri ? 2 : 0},
                  ]}
                  source={{uri}}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {focusedImageUri !== '' && (
        <View style={styles.button}>
          <PrimaryButton
            width={320}
            onPress={onPressDecideImage}
            text={'この画像を使う'}
          />
        </View>
      )}

      <View>
        <Text>{image}</Text>
        <Text style={styles.text}>作りたい画像のキーワード入れましょう</Text>
      </View>

      <TextInput
        style={[styles.input]}
        placeholder="中世風のナイフ"
        placeholderTextColor="#888888"
        onChangeText={text => onChangeText(text)}
      />

      <View>
        <Text style={[styles.text, {textAlign: 'left'}]}>キーワードの例</Text>
        <Text style={styles.sm}>
          こんな感じで入力すると、よりイメージに近い画像を作成 できます！
        </Text>

        <Text style={styles.bullet}>・中世風のナイフ</Text>
        <Text style={styles.bullet}>・可愛いスマホ</Text>
        <Text style={styles.bullet}>・SFな銃</Text>
      </View>

      <View style={styles.button}>
        <PrimaryButton width={320} onPress={onPress} text={'画像を生成'} />
      </View>
    </View>
  );
};

export default ImageCreatePresenter;
