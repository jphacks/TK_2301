import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 20,
    paddingHorizontal: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    width: 99,
    height: 56,
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  ellipses: {
    width: 20,
    height: 4,
    marginRight: 7,
  },
});

export default styles;
