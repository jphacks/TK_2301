import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: '100%',
    backgroundColor: '#60626D',
  },
  text: {
    color: '#DADEE180',
    textAlign: 'center',
    borderRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#696969',
    padding: 16,
    marginBottom: 40,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 16,
  },
  modalContainer: {
    backgroundColor: '#323338',
    width: 305,
    padding: 40,
    borderRadius: 10,
    position: 'absolute',
    top: 200,
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
});

export default styles;
