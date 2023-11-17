import { StyleSheet } from "react-native"
import { colorCode, staticSizeValue } from "../../../styles/general"

const styles = StyleSheet.create({
  container: {
    margin: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#6b6c78",
    paddingTop: 24
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff"
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center"
  },
  viewAllButtonText: {
    fontSize: 13,
    paddingLeft: 4,
    color: "#3DD6DD"
  }
})

export default styles
