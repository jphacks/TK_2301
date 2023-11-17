import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalText: {
    marginTop: 20,
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center",
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
});

export default styles;
