import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  characterVoteButton: {
    marginBottom: 10,
  },
  serifView: {
    marginBottom: 60,
  },
  serifContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  serifHeaderContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  serifHeader: {
    flexDirection: 'row',
    borderRadius: 200,
    alignItems: 'center',
    alignContent: 'center',
  },
  serifInput: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 8,
    backgroundColor: '#1E1F23',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingVertical: 8,
    marginLeft: 50,
    color: 'white',
  },
  storyTellerSerifInput: {
    backgroundColor: '#1E1F23',
    fontWeight: 'bold',
    paddingLeft: 10,
    height: 80,

    color: 'white',
  },

  tabBar: {
    backgroundColor: 'black',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tabBarContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  characterSelectIcon: {
    flexDirection: 'row',
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginHorizontal: 5,
  },

  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  iconText: {
    fontWeight: 'bold',
    color: 'white',
  },
  storyTellerText: {
    marginBottom: 10,
  },
  focusedSerifInput: {
    backgroundColor: '#414247',
  },
});

export default styles;