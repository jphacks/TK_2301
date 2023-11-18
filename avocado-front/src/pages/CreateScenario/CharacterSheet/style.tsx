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
  input: {
    borderWidth: 1,
    borderColor: '#696969',
    padding: 16,
    color: '#fff',
  },
  nameInput: {
    height: 60,
    width: 300,
  },
  openInput: {marginBottom: 40, paddingVertical: 16},
  privateInput: {
    marginBottom: 40,
  },
  timelineInput: {
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
