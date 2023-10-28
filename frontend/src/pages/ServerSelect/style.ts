import { StyleSheet } from "react-native"
import { colorCode } from "../../styles/general"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorCode.primaryBackground,
    paddingHorizontal: 20,
    paddingTop: 24
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  },
  fix: {
    position: "absolute",
    bottom: 120,
    left: 0,
    right: 0,
    alignItems: "center"
  }
})

export default styles
