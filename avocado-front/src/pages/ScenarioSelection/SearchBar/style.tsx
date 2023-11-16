import { StyleSheet } from "react-native"
import { colorCode, staticSizeValue } from "../../../styles/general"

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorCode.primaryBackground
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 230,
    height: 40,
    backgroundColor: "#1e1f23",
    borderRadius: 25,
    paddingLeft: 16
  },
  input: {
    fontSize: 13,
    paddingLeft: 6,
    color: "#fff"
  },
  purpleButton: {
    marginLeft: 20
  }
})

export default styles
