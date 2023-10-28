import { StyleSheet } from "react-native"
import { colorCode } from "../../../styles/general"

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorCode.secondlyBackground,
    borderColor: colorCode.border,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginHorizontal: 16
  },
  icon: {
    marginRight: 20,
    marginVertical: 10
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 15
  }
})

export default styles
