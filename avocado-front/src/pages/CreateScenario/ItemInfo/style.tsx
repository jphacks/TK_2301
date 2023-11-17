import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  image: {
    marginBottom: 24,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 40,
    paddingBottom: 16,
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
    marginTop: 16,
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
  labeledInputText: {
    marginTop: 16,
    marginBottom: 8,
  },
  radioBox: {
    color: 'white',
  },
  radioLabelStyle: {
    color: 'white',
  },
  radioButton: {
    color: '#3DD6DD',
  },
  selectedImage: {
    height: 200,
    width: '100%',
  }
});

export default styles;
