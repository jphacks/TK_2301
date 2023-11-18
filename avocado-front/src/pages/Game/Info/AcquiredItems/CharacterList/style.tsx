import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 23,
    width: 317,
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
