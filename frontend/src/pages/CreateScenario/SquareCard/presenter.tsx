import React from "react";
import {Image, Pressable, Text, View} from "react-native";
import {Props as ContainerProps} from "./index";
import styles from "./style";

type Props = {} & ContainerProps;

const SquareCardPresenter = ({label, onPress, style}: Props) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <View>
        <Text style={styles.main}>{label}</Text>
      </View>
      <Image source={require("./く.png")} style={[styles.image]}></Image>
    </Pressable>
  );
};

export default SquareCardPresenter;
