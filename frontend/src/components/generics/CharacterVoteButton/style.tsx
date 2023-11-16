import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  container: {
    width: "100%",
    height: 100,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#60626D',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 5, 
  },
  characterContainer: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainText: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    width: 270,
  },
  icon: {
    width: 40,
    height: 40,
  },
  
});

export default styles;
