import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  characterNameForm: {
    marginVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 40,
  },
  input: {
    height: 40,
    borderRadius: 2,
    paddingHorizontal: 16,
    borderColor: '#696969',
    borderWidth: 1,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  smallInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unit: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
});

export default styles;
