import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  characterNameForm: {
    marginVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#696969',
    padding: 16,
    color: '#fff',

  },
  nameInput: {
    height: 48,
    width: 260,
  },
  openInput: {height: 96, marginBottom: 40},
  privateInput: {
    height: 60,
    marginBottom: 40,
  },
  timelineInput: {
    height: 60,
    marginBottom: 40,
  },
  purposeInput: {
    height: 70,
    marginBottom: 180,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
});

export default styles;
