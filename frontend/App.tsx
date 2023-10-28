/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {RootRoutes} from './src/routes/Root';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, useColorScheme} from 'react-native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={'#fff'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <RootRoutes />
    </NavigationContainer>
  );
}

export default App;
