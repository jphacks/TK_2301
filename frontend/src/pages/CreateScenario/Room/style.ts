import {StyleSheet} from "react-native";

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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    height: 500,
    paddingTop: 0,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 100,
    backgroundColor: "#323338",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    opacity: 0.9,
  },
  instructionText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    marginBottom: 20,
  },
  modalHeader: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemCard: {
    color: "white",
    flexDirection: "row",
    width: "95%",
    height: 100,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#2A2A2A",
    borderRadius: 5,
  },
  cardImage: {
    width: 100,
    height: 60,
    marginLeft: 10,
    borderRadius: 5,
  },
  cardText: {
    color: "white",
    fontSize: 20,
    marginLeft: 20,
    width: 160,
    fontWeight: "bold",
  },
  cardSubText: {
    color: "#DADEE180",
    fontSize: 8,
    fontWeight: "bold",
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
