import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import LabeledTextInput from '../../../components/generics/LabeledTextInput';
import ImageSelector from '../../../components/generics/ImageSelector';
import ImageSelectModal from '../../../components/generics/ImageSelectModal';
import {Item} from '../../../models/scenario';
import {useCreateScenario} from '../createScenario';

type Props = {
  openModal: () => void;
  closeModal: () => void;
  showModal: boolean;
  onPressImageWithAI: () => void;
  onPressImageFromStorage: () => void;
  isSelectedImage: boolean;
  showItemModal: boolean;
  reverseVisible: () => void;
  items: Map<string, Item>;
  setItems: React.Dispatch<React.SetStateAction<Map<string, Item>>>;
  targetUri: string;
};

// アイコンの大きさ差分。ちょうど矢印の先端がタップした場所になるように調整
const PIN_ICON_WIDTH_DIFF = 5;
const PIN_ICON_HEIGHT_DIFF = 52;

const RoomPresenter = ({
  openModal,
  showModal,
  closeModal,
  onPressImageFromStorage,
  onPressImageWithAI,
  isSelectedImage,
  showItemModal,
  reverseVisible,
  targetUri,
}: Props) => {
  const [currentPressedX, setCurrentPressedX] = useState(0);
  const [currentPressedY, setCurrentPressedY] = useState(0);

  const window = useWindowDimensions();
  const adjustedBackImageWidth = window.width;
  const adjustedBackImageHeight = window.height - 120;

  const {items, setItems, floorMaps, setFloorMaps, targetId, targetImageURL} =
    useCreateScenario();

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
      <LabeledTextInput
        labelName={'部屋の名前'}
        style={[styles.container, {marginBottom: isSelectedImage ? 20 : 20}]}
        onTextChange={name => {
          if (targetId === undefined || typeof targetId === 'number') {
            return;
          }

          const data = floorMaps.get(targetId);
          if (data === undefined) {
            return;
          }

          data.name = name;
          floorMaps.set(targetId, data);
          setFloorMaps(floorMaps);
        }}
      />

      {targetImageURL !== '' ? (
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>

          {/* ================ フロアマップ画像 ==================== */}
          <TouchableOpacity
            onPress={e => {
              // ちょうど矢印の先端がタップした場所になるように調整
              setCurrentPressedX(
                (e.nativeEvent.locationX - PIN_ICON_WIDTH_DIFF) /
                  adjustedBackImageWidth,
              );
              setCurrentPressedY(
                (e.nativeEvent.locationY - PIN_ICON_HEIGHT_DIFF) /
                  adjustedBackImageHeight,
              );

              reverseVisible();
            }}
            style={[
              styles.image,
              {width: window.width, height: adjustedBackImageHeight},
            ]}>
            <ImageBackground
              source={{uri: targetImageURL}}
              style={{width: window.width, height: adjustedBackImageHeight}}>
              {/* ================ マップ上に表示されるアイテムアイコン ===================== */}
              {Array.from(items.values()).map((item, index) => {
                if (item.coordinate === undefined || item.mapId !== targetId) {
                  return undefined;
                }

                return (
                  <TouchableOpacity key={`pin.${index}.${item.itemId}`}>
                    <Image
                      source={require('./images/pin.png')}
                      style={{
                        left: item.coordinate.x * adjustedBackImageWidth,
                        top: item.coordinate.y * adjustedBackImageHeight,
                        position: 'absolute', // 子要素を絶対位置に設定
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      ) : (
        <ImageSelector onPress={openModal} text={''} style={undefined} />
      )}

      {/* ================ 配置するアイテムのモーダル ===================== */}
      <Modal animationType="slide" transparent={true} visible={showItemModal}>
        <TouchableOpacity style={styles.modalView} onPress={reverseVisible}>
          <Text style={styles.modalHeader}>追加できる証拠品／情報</Text>
          {Array.from(items, ([key, item]) => {
            return (
              <TouchableOpacity
                style={styles.itemCard}
                key={`modal.${key}.${item.itemId}`}
                onPress={() => {
                  item.mapId = targetId || '';
                  item.coordinate = {
                    x: currentPressedX,
                    y: currentPressedY,
                  };

                  items.set(key, item);
                  setItems(items);

                  reverseVisible();
                }}>
                <Image
                  source={require('./images/sample.png')}
                  style={styles.cardImage}></Image>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardText}>{item.name}</Text>
                  {item.coordinate !== undefined && (
                    <Text style={styles.cardSubText}>{item.mapId}</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default RoomPresenter;
