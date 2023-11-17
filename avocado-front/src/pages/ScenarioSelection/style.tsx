import { StyleSheet } from "react-native"
import { colorCode, staticSizeValue } from "../../styles/general"

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorCode.primaryBackground,
    paddingHorizontal: 16
  },
  searchBarContainer: {
    backgroundColor: colorCode.primaryBackground,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16
  },
  purpleButton: {
    marginLeft: 20
  }
})

export default styles
