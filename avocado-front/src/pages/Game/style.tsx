import {StyleSheet} from 'react-native';
import {colorCode, staticSizeValue} from '../../styles/general';

const styles = StyleSheet.create({
  normalContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colorCode.primaryBackground,
  },
  floorMapContainer: {
    flex: 1,
    backgroundColor: colorCode.primaryBackground,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default styles;
