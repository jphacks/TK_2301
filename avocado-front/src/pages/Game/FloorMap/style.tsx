import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 26,
    bprderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#4b515b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#DADEE1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#1e1f23',
    paddingVertical: 16,
  },
  where: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  backIcon: {},
  backContainer: {
    width: 30,
    height: 45,
    padding: 16,
    position: 'absolute',
    top: 3,
    left: 18,
  },
  time: {
    left: 18,
    height: 45,
    position: 'absolute',
    fontSize: 13,
    color: '#3DD6DD',
    textAlign: 'center',
  },
});

export default styles;
