import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  iconBackground: {
    backgroundColor: 'white',
    borderRadius: 30,
    position: 'absolute',
    width: 20,
    height: 10,
    top: 8,
    left: 5,
  },
  notSelectedIcon: {
    backgroundColor: '#9D9D9D',
    borderRadius: 30,
    width: 15,
    height: 15,
    marginRight: 10,
  },
});

export default styles;
