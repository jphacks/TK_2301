import React, {useState} from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  View,
  useWindowDimensions,
  Modal,
  Button,
} from "react-native";
import {Props as ContainerProps} from "./index";
import styles from "./style";
import LabeledTextInput from "../../../components/generics/LabeledTextInput";
import ImageSelector from "../../../components/generics/ImageSelector";
import ImageSelectModal from "../../../components/generics/ImageSelectModal";

type Props = {
  openModal: () => void;
  closeModal: () => void;
  showModal: boolean;
  onPressImageWithAI: () => void;
  onPressImageFromStorage: () => void;
  isSelectedImage: boolean;
  showItemModal: boolean;
  reverseVisible: () => void;
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

  // const chooseImage = async () => {
  //   const options = {
  //     mediaType: "photo",
  //     maxWidth: 1000,
  //     maxHeight: 1000,
  //     quality: 0.8,
  //     saveToPhotos: true,
  //   };

  //   const result = await ImagePicker.launchImageLibrary(options, res => {
  //     console.log(res);
  //   });
  // };

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
          <View
            onTouchStart={e => {
              console.log("touchMove", e.nativeEvent);
  
              setX(e.nativeEvent.locationX);
              setY(e.nativeEvent.locationY);
  
              reverseVisible();
  
              console.log("touchMove", window.width);
            }}
            style={styles.image}>
            <ImageBackground
              source={require("./images/back.png")}
              style={{width: window.width, height: 500}}>
              <Image
                source={require("./images/pin.png")}
                style={{left: x - 5, top: y - 50}}
              />
            </ImageBackground>
          </View>
          {
            !showItemModal && 
              <View style={{justifyContent: "center", alignItems: "center", marginTop: 10}}>
                <Text style={styles.instructionText}>アイテムを設置する位置をタップ</Text>
              </View>
          }
        </View>
      ) : (
        <ImageSelector onPress={openModal} text={""} style={undefined} />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showItemModal}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>追加できる証拠品／情報</Text>
          <View style={styles.itemCard}>
            <Image source={require("./images/sample.png")} style={styles.cardImage}></Image>
            <View style={styles.cardText}>
              <Text style={styles.cardText}>アイテム選択</Text>
            </View>
          </View>
          <View style={styles.itemCard}>
            <Image source={require("./images/sample.png")} style={styles.cardImage}></Image>
            <View style={styles.cardText}>
              <Text style={styles.cardText}>アイテム選択</Text>
            </View>
          </View>
          <View style={styles.itemCard}>
            <Image source={require("./images/sample.png")} style={styles.cardImage}></Image>
            <View style={styles.cardText}>
              <Text style={styles.cardText}>アイテム選択</Text>
            </View>
          </View>
          <Button title="close modal" onPress={reverseVisible} />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default RoomPresenter;
