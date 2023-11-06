import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#696969",
    padding: 16,
    marginBottom: 40,
  },
  label: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 16,
  },
  modalContainer: {
    backgroundColor: "#323338",
    width: 305,
    padding: 40,
    borderRadius: 10,
    position: "absolute",
    top: 200,
  },
  modalText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 24,
  },
  closeIcon: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  image: {
    // marginRight: 10,
    width: 392.72727272727275,
    height: 500,
  },
  imageSelect: {
    // marginRight: 10,
    marginTop: 10,
  },
});

export default styles;
