import { StyleSheet } from "react-native"
import { colorCode } from "../../../styles/general"

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: colorCode.secondlyBackground,
    borderRadius: 10,
    paddingBottom: 10
  },
  header: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 20
  },
  headerButton: {
    marginLeft: 60,
    marginRight: 16
  },
  subText: {
    color: "#898F99",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 20
  }
})

export default styles
