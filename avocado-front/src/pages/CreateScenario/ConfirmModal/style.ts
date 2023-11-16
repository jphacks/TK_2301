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
  },
  modalHeaderText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
  modalText: {
    color: "#fff",
    fontSize: 14,
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    height: 500,
    paddingTop: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(50,51,56,0.7)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  instructionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: 10,
  },
  modalHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemCard: {
    color: 'white',
    flexDirection: 'row',
    width: '95%',
    height: 100,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#2A2A2A',
    borderRadius: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default styles;
