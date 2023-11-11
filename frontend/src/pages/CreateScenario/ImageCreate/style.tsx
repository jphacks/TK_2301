import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    width: 358,
    borderWidth: 1,
    padding: 16,
    borderColor: '#696969',
    marginTop: 16,
    marginBottom: 40,
  },
  sm: {
    color: '#fff',
    fontSize: 13,
    paddingTop: 16,
  },
  bullet: {
    color: '#fff',
    fontSize: 13,
    paddingTop: 8,
  },
  button: {
    paddingVertical: 20,
  },
  proposedImageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 320,
    marginTop: 8,
  },
  proposedImage: {
    height: 150,
    width: 150,
    margin: 5,
    borderColor: '#3DD6DD',
    borderWidth: 2,
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
