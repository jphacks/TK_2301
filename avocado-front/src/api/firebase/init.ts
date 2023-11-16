import {initializeApp, getApps} from 'firebase/app';
import {Platform} from 'react-native';

const androidCredentials = {
  clientId: '',
  appId: '1:834098871992:android:653899f4a4054746af7e4d',
  apiKey: 'AIzaSyDDY8XWZhLj0mPH4pXP_T2FSowGMXsQjlw',
  authDomain: 'com.example',
  projectId: 'avocado-test-5e236',
  storageBucket: 'avocado-test-5e236.appspot.com',
  databaseURL: '',
  messagingSenderId: '',
};

// Your secondary Firebase project credentials for iOS...
const iosCredentials = {
  clientId: '',
  appId: '1:834098871992:ios:66e3eea63a10ea58af7e4d',
  apiKey: 'AIzaSyBI-mBJICtr9HM6lRTO3M492HSIFg8NRqc',
  databaseURL: '',
  storageBucket: 'avocado-test-5e236.appspot.com',
  messagingSenderId: '',
  projectId: 'avocado-test-5e236',
};

// Firebaseアプリの初期化
export const initializeFirebase = async () => {
  try {
    console.log('Starting Firebase Initialization...');

    if (getApps.length > 0) {
      console.log('Firebase is already initialized.');
      return;
    }

    const credentials = Platform.select({
      android: androidCredentials,
      ios: iosCredentials,
    });

    await initializeApp(iosCredentials);
    console.log('Firebase Initialization Completed.');
    return true;
  } catch (error) {
    console.error('Firebase Initialization Error:', error);
  }

  console.log('Firebase Initialization Completed.');
};
