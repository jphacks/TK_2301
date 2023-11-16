import { StyleSheet } from "react-native"
import { colorCode, staticSizeValue } from "../../../styles/general"

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  interactiveLing: {
    width: staticSizeValue.interactiveIconLingSize,
    height: staticSizeValue.interactiveIconLingSize,
    borderRadius: staticSizeValue.interactiveIconLingSize / 2,
    borderWidth: 1,
    borderColor: colorCode.interactiveIconLing,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 8,
    fontWeight: "400",
    marginTop: 2,
    color: colorCode.interactiveIconText
  }
})

export default styles
