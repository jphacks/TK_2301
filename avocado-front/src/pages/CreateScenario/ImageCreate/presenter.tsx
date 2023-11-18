import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import PrimaryButton from '../../../components/generics/PrimaryButton';
import {ImageType, ItemImageCandidate} from '../../../models/scenario';
import FetchingModal from '../FetchingModal';
import PagerView from 'react-native-pager-view';

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
  targetImageType: ImageType;
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
  targetImageType,
}: Props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ScrollView>
      <View style={styles.container}>
        <FetchingModal textContent={'生成中...'} />

        {fetchedImage &&
          (targetImageType === ImageType.FloorMap ? (
            <View style={styles.proposedImageForFloorMapContainer}>
              <View style={styles.proposedImageContainer}>
                <PagerView
                  style={styles.viewPager}
                  initialPage={0}
                  onPageSelected={event => {
                    setFocusedImageUri('');
                    const {position} = event.nativeEvent;
                    setSelectedIndex(position);
                  }}>
                  {candidateImageUri.map(uri => {
                    return (
                      <TouchableOpacity
                        key={`floorMap.${uri}`}
                        onPress={() => {
                          setFocusedImageUri(uri);
                        }}>
                        <Image
                          style={[
                            styles.proposedImageForFloorMap,
                            {borderWidth: focusedImageUri === uri ? 2 : 0},
                          ]}
                          source={{uri}}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </PagerView>
              </View>

              <View style={styles.proposedImageDotsContainer}>
                {candidateImageUri.map((uri, index) => {
                  return (
                    <View
                      key={`proposedImageDots.${index}`}
                      style={[
                        styles.dot,
                        {
                          marginRight:
                            index === candidateImageUri.length - 1 ? 0 : 8,
                          backgroundColor:
                            selectedIndex === index ? 'white' : '#6e6d6d',
                        },
                      ]}></View>
                  );
                })}
              </View>
            </View>
          ) : (
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
          ))}

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
    </ScrollView>
  );
};

export default ImageCreatePresenter;
