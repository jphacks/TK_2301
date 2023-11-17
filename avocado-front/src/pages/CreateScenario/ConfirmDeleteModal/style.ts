import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#323338',
    width: 320,
    padding: 40,
    borderRadius: 10,
  },
  deleteTargetText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  modalHeaderText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 15,
  },
  modalText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    paddingBottom: 24,
  },
  buttonWrapContainer: {alignItems: 'center'},
  buttonContainer: {
    width: 200,
    borderRadius: 35,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 24,
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
