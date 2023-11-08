import React, {useState} from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import {Props as ContainerProps} from "./index";
import styles from "./style";
import LabeledTextInput from "../../../components/generics/LabeledTextInput";
import ImageSelector from "../../../components/generics/ImageSelector";
import ImageSelectModal from "../../../components/generics/ImageSelectModal";
import {ClueItem, FloorMap, useCreateScenario} from "../createScenario";

type Props = {
  openModal: () => void;
  closeModal: () => void;
  showModal: boolean;
  onPressImageWithAI: () => void;
  onPressImageFromStorage: () => void;
  isSelectedImage: boolean;
  showItemModal: boolean;
  reverseVisible: () => void;
  clueItems: Map<string, ClueItem>;
  setClueItems: React.Dispatch<React.SetStateAction<Map<string, ClueItem>>>;
} & ContainerProps;

const RoomPresenter = ({
  openModal,
  showModal,
  closeModal,
  onPressImageFromStorage,
  onPressImageWithAI,
  isSelectedImage,
  showItemModal,
  reverseVisible,
}: Props) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const window = useWindowDimensions();
  const {clueItems, setClueItems, floorMaps, setFloorMaps, targetId} =
    useCreateScenario();

  return (
    <ScrollView>
      {showModal && (
        <ImageSelectModal
          test={""}
          label={"証拠品／情報の画像"}
          onPressImageWithAI={onPressImageWithAI}
          onPressImageFromStorage={onPressImageFromStorage}
        />
      )}
      <LabeledTextInput
        labelName={"部屋の名前"}
        style={styles.container}
        onTextChange={name => {
          if (targetId === undefined || typeof targetId === "number") {
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

      {isSelectedImage ? (
        <View>
          <TouchableOpacity
            onPress={e => {
              // アイコンの大きさを加味しながら、座標を保存
              setX(e.nativeEvent.locationX - 5);
              setY(e.nativeEvent.locationY - 50);
              reverseVisible();
            }}
            style={styles.image}>
            <ImageBackground
              source={require("./images/back.png")}
              style={{width: window.width, height: 500}}>
              {/* ================ マップ上に表示されるアイテムアイコン ===================== */}
              {Array.from(clueItems.values()).map((item, index) => {
                if (item.coordinate === undefined || item.mapId !== targetId) {
                  return undefined;
                }

                return (
                  <TouchableOpacity>
                    <Image
                      key={index}
                      source={require("./images/pin.png")}
                      style={{
                        left: item.coordinate.x,
                        top: item.coordinate.y,
                        position: "absolute", // 子要素を絶対位置に設定
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </ImageBackground>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}>
            {!showItemModal && (
              <Text style={styles.instructionText}>
                アイテムを設置する位置をタップ
              </Text>
            )}
          </View>
        </View>
      ) : (
        <ImageSelector onPress={openModal} text={""} style={undefined} />
      )}

      {/* ================ 配置するアイテムのモーダル ===================== */}
      <Modal animationType="slide" transparent={true} visible={showItemModal}>
        <TouchableOpacity style={styles.modalView} onPress={reverseVisible}>
          <Text style={styles.modalHeader}>追加できる証拠品／情報</Text>
          {Array.from(clueItems, ([key, item]) => {
            return (
              <TouchableOpacity
                style={styles.itemCard}
                key={key}
                onPress={() => {
                  if (typeof targetId === "string") {
                    item.mapId = targetId;

                    const mapName = floorMaps.get(targetId);
                    item.mapName = mapName?.name;
                  }

                  item.coordinate = {
                    x,
                    y,
                  };

                  console.log(item);
                  clueItems.set(key, item);

                  setClueItems(clueItems);
                  reverseVisible();
                }}>
                <Image
                  source={require("./images/sample.png")}
                  style={styles.cardImage}></Image>
                <Text style={styles.cardText}>{item.name}</Text>
                {item.coordinate !== undefined && (
                  <Text style={styles.cardSubText}>{item.mapName}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default RoomPresenter;
