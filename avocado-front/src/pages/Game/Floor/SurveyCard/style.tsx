import { StyleSheet, Dimensions } from "react-native"
import { colorCode } from "../../../../styles/general"

const headerTotalHeight = 174

const styles = StyleSheet.create({
  container: {
    width: 305,
    backgroundColor: colorCode.primaryBackground,
    paddingTop: 36,
    paddingBottom: 31,
    top: -headerTotalHeight / 2
  },
  close: {
    position: "absolute",
    top: 16,
    right: 16
  },
  countText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingTop: 8,
    paddingBottom: 30
  }
})

export default styles
