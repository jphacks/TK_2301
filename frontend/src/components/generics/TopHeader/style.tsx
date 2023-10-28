import { StyleSheet } from "react-native"
import { colorCode, staticSizeValue } from "../../../styles/general"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: colorCode.primaryBackground
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  headerRight: {},
  icon: {
    margin: 8
  }
})

export default styles
