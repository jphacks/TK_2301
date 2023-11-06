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
import {ClueItem, useCreateScenario} from "../createScenario";

type Props = {
  openModal: () => void;
  closeModal: () => void;
  showModal: boolean;
  onPressImageWithAI: () => void;
  onPressImageFromStorage: () => void;
  isSelectedImage: boolean;
  showItemModal: boolean;
  reverseVisible: () => void;
  clueItems: ClueItem[];
  setClueItems: React.Dispatch<React.SetStateAction<ClueItem[]>>;
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
  const {clueItems, setClueItems} = useCreateScenario();

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
      <LabeledTextInput labelName={"部屋の名前"} style={styles.container} />

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
              {clueItems.map((item, index) => {
                if (item.coordinate === undefined) {
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

      <Modal animationType="slide" transparent={true} visible={showItemModal}>
        <TouchableOpacity style={styles.modalView} onPress={reverseVisible}>
          <Text style={styles.modalHeader}>追加できる証拠品／情報</Text>
          {clueItems.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.itemCard}
                key={index}
                onPress={() => {
                  const newArray = [...clueItems]; // 配列のコピーを作成
                  newArray[index].coordinate = {
                    x,
                    y,
                  };
                  setClueItems(newArray);
                  reverseVisible();
                }}>
                <Image
                  source={require("./images/sample.png")}
                  style={styles.cardImage}></Image>
                <Text style={styles.cardText}>{item.name}</Text>
                {item.coordinate !== undefined && (
                  <Text style={styles.cardSubText}>設置済み</Text>
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
