import React, {FC, useEffect, useState} from 'react';
import {Text, Button, TextInput, View} from 'react-native';
import type {RootRoutesParamList} from '../../routes/Root';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {initializeFirebase} from '../../api/firebase/init';
import {AuthError} from '../../api/firebase/error';

type Props = NativeStackScreenProps<RootRoutesParamList, 'LoginPage'>;
export const LoginPage: FC<Props> = ({navigation}) => {
  const [isInitializedFirebase, setIsInitializedFirebase] = useState(false);

  // 初回描画時にFirebase初期化
  useEffect(() => {
    const initFirebase = async () => {
      await initializeFirebase();
      setIsInitializedFirebase(true);
    };

    initFirebase();
  }, []);

  // テスト用アカウント情報を標準値として設定
  const [email, onChangeEmail] = useState('hoge@gmail.com');
  const [password, onChangePassword] = useState('hogehoge');

  const FirebaseAuth = async () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('SUCCESS: signed in');
        navigation.push('HomePage');
      })
      .catch(error => {
        if (error.code === AuthError.InvalidEmail) {
          console.log('invalid email');
        }

        if (error.code === AuthError.UserDisabled) {
          console.log('user disabled');
        }

        if (error.code === AuthError.UserNotFound) {
          console.log('user not found');
        }

        if (error.code === AuthError.WrongPassword) {
          console.log('wrong password');
        }

        console.error(error);
      });
  };

  return (
    isInitializedFirebase && (
      <View>
        <Text>LOGIN</Text>
        <TextInput onChangeText={onChangeEmail} value={email} />
        <TextInput onChangeText={onChangePassword} value={password} />
        <Button onPress={FirebaseAuth} title="Login" />
      </View>
    )
  );
};
