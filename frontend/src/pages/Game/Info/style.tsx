import {StyleSheet} from 'react-native';
import {colorCode, staticSizeValue} from '../../../styles/general';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorCode.primaryBackground,
    paddingHorizontal: 16,
  },
  barContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  bar: {
    width: 80,
    height: 2,
    backgroundColor: '#d9d9d9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#6a6c78',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
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
