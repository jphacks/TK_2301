import React from "react";
import {Text, View} from "react-native";
import {Props as ContainerProps} from "./index";
import styles from "./style";
import PrimaryButton from "../PrimaryButton";

type Props = {
  url: any;
} & ContainerProps;

const ImageSelectModalPresenter = ({url, label, onPressImageWithAI, onPressImageFromStorage}: Props) => {
  return (
    <View style={{alignItems: "center", zIndex: 30}}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>{label}</Text>
        <PrimaryButton text="AIで作成" onPress={onPressImageWithAI} width={238} />
        <PrimaryButton
          text="画像選択"
          onPress={onPressImageFromStorage}
          width={238}
          style={styles.imageSelect}
        />
      </View>
    </View>
  );
};

export default ImageSelectModalPresenter;
