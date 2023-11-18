import {StyleSheet, Dimensions} from 'react-native';
import {colorCode} from '../../../../../styles/general';

const headerTotalHeight = 174;

const styles = StyleSheet.create({
  container: {
    width: 305,
    backgroundColor: colorCode.primaryBackground,
    paddingTop: 59,
    paddingBottom: 31,
    paddingHorizontal: 16,
  },
  close: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  image: {
    width: 273,
    height: 154,
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 16,
    paddingBottom: 4,
  },
  category: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: 13,
    alignSelf: 'flex-start',
  },
  description: {
    color: '#fff',
    fontSize: 13,
    paddingTop: 10,
    paddingBottom: 30,
  },
});

export default styles;
