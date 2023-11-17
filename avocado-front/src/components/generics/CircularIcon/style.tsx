import { StyleSheet } from "react-native"
import { staticSizeValue } from "../../../styles/general"

const styles = StyleSheet.create({
  circularImage: {
    width: staticSizeValue.interactiveIconSize,
    height: staticSizeValue.interactiveIconSize,
    borderRadius: staticSizeValue.interactiveIconSize / 2
  }
})

export default styles
