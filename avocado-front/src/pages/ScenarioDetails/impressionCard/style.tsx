import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#60626D",
    paddingHorizontal: 24
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#484B5B"
  },
  icon: {
    width: 32,
    height: 32
  },
  name: {
    color: "#fff",
    fontSize: 13,
    marginLeft: 16
  },
  comment: {
    color: "#fff",
    fontSize: 13,
    paddingTop: 16,
    paddingBottom: 32
  }
})

export default styles
