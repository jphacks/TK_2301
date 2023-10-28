/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {RootRoutes} from './src/routes/Root';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {UserProvider} from './src/context/user.context';
import {initializeFirebase} from './src/api/firebase/init';
import {SocketProvider} from './src/context/socket.context';
import {TabbarProvider} from './src/context/tabbar.context';
import {GameProvider} from './src/pages/Game/game.context';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isInitializedFirebase, setIsInitializedFirebase] = useState(false);

  // 初回描画時にFirebase初期化
  useEffect(() => {
    const initFirebase = async () => {
      await initializeFirebase();
      setIsInitializedFirebase(true);
    };

    initFirebase();
  }, []);

  return (
    <>
      {isInitializedFirebase ? (
        <NavigationContainer>
          <GameProvider>
            <SocketProvider>
              <UserProvider>
                <TabbarProvider>
                  <SafeAreaView style={{backgroundColor: '#000'}} />
                  <StatusBar
                    backgroundColor={'#fff'}
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                  />
                  <RootRoutes isInitializedFirebase={isInitializedFirebase} />
                </TabbarProvider>
              </UserProvider>
            </SocketProvider>
          </GameProvider>
        </NavigationContainer>
      ) : null}
    </>
  );
}

export default App;
