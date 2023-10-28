import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 24,
    borderBottomColor: "#ffffff",
    marginRight: 16
  },
  thumbnail: {
    width: 286,
    height: 160
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    paddingTop: 8,
    paddingBottom: 4
  },
  evaluation: {
    flexDirection: "row"
  },
  rating: {
    fontSize: 11,
    color: "#FFC148",
    paddingRight: 4
  },
  info: {
    flexDirection: "row",
    paddingTop: 4
  },
  infoText: {
    fontSize: 13,
    color: "#DADEE1"
  }
})

export default styles
