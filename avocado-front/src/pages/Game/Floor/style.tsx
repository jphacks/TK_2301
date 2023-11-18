import {StyleSheet, Dimensions} from 'react-native';
import {colorCode} from '../../../styles/general';

const headerTotalHeight = 174;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.65,
  },
  lockCard: {
    alignItems: 'center',
    width: 305,
    backgroundColor: colorCode.primaryBackground,
    paddingTop: 36,
    paddingBottom: 31,
    top: headerTotalHeight / 2,
    left: Dimensions.get('window').width / 2 - 305 / 2,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default styles;
