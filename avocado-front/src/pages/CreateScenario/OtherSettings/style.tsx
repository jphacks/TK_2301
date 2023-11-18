import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 40,
    paddingBottom: 16,
  },
  imageContainer: {
    marginTop: 20,
    height: 200,
    width: '100%',
  },
  input: {
    color: 'white',
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderColor: '#696969',
    borderWidth: 1,
  },
  timeRequired: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minutesText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20, // 角の丸みを調整
    borderWidth: 1,
    borderColor: '#fff',
    marginHorizontal: 5,
  },
  activeTab: {
    borderColor: '#FFC148',
  },
  activeText: {
    color: '#FFC148',
  },
  tabText: {
    color: '#fff', // デザインに合わせて変更してください
    textAlign: 'center',
  },
});

export default styles;
