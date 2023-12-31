import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#696969',
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#323338',
    width: 305,
    padding: 40,
    borderRadius: 10,
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 24,
  },
  closeIcon: {
    position: 'absolute',
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
    marginTop: 100,
    paddingBottom: 100,
    backgroundColor: '#323338',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    opacity: 0.9,
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
  itemDetailTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
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
  cardImage: {
    width: 100,
    height: 60,
    marginLeft: 10,
    borderRadius: 5,
  },
  detailItemContainer: {
    backgroundColor: '#323338',
    paddingTop: 20,
    padding: 30,
  },
  iconContainer: {
    marginBottom: 10,
  },
  dummyWhite: {
    backgroundColor: 'white',
    left: 5,
    top: 5,
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  detailItemImage: {
    width: 300,
    height: 200,
    marginLeft: 10,
    borderRadius: 5,
  },
  categoryWrapper: {
    width: 60,
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: 8,
    backgroundColor: '#2A2A2A',
  },
  cardTextContainer: {
    marginLeft: 20,
  },
  cardText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardSubText: {
    color: '#DADEE180',
    fontSize: 8,
    marginTop: 2,
    fontWeight: 'bold',
  },
  noItemText: {
    color: '#DADEE180',
    fontSize: 16,
    marginTop: 2,
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemDetailDescription: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemPinModalView: {
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
