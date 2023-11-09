import React from "react";
import {Image, Pressable, Text, TouchableHighlight, View} from "react-native";
import {Props as ContainerProps} from "./index";
import styles from "./style";
import PrimaryButton from "../PrimaryButton";

type Props = {
  url: any;
  text: string;
} & ContainerProps;

const ImageSelectorPresenter = ({onPress}: Props) => {
  return (
    <TouchableHighlight onPress={onPress} style={[styles.container]}>
      <View>
        <Image source={require("./camera.png")} />
        <Text style={styles.text}>部屋の画像</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ImageSelectorPresenter;
