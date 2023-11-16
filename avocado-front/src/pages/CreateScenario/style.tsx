import {StyleSheet} from 'react-native';
import {colorCode} from '../../styles/general';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorCode.primaryBackground,
  },
  tabBar: {
    backgroundColor: colorCode.primaryBackground,
  },
  label: {
    color: '#fff',
    fontSize: 13,
  },
});

export default styles;
