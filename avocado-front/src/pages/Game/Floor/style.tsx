import { StyleSheet, Dimensions } from "react-native"

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  background: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.65
  }
})

export default styles
