import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    marginBottom: 10,
    height: 580,
    paddingVertical: 20,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 23,
  },
  cancel: {
    width: 146,
    borderRadius: 35,
    backgroundColor: '#2A2A2A',
  },
  cancelText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    paddingVertical: 24,
  },
});

export default styles;
