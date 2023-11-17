import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2b2b2b',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#484B5B',
  },
  icon: {
    width: 32,
    height: 32,
  },
  name: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 16,
  },
  descriptionContainer: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  profession: {color: '#fff'},
  description: {color: '#fff'},
});

export default styles;
