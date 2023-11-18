import React, {FC, useEffect, useRef, useState} from 'react';
import type {RootRoutesParamList} from '../../routes/Root';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ServerSelectPagePresenter} from './presenter';
import {Text} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {AuthError} from '../../api/firebase/error';
import {useUser} from '../../context/user.context';
import {Room} from '../../type';
import {useSocket} from '../../context/socket.context';
import {createScenarioFirestore} from '../../api/firebase/firestore';

export type Props = NativeStackScreenProps<RootRoutesParamList, 'ServerSelect'>;
export const ServerSelectPage: FC<Props> = ({navigation}) => {
  const [receivedMessage, setReceivedMessage] = useState<string>('');
  const [isInitializedFirebase, setIsInitializedFirebase] = useState(false);
  const {user, setUser} = useUser();
  const {socketRef, rooms} = useSocket();
  console.log(rooms);

  useEffect(() => {
    const login = async () => {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          'test@gmail.com',
          'testtest',
        );

        setUser({
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          iconUrl: await createScenarioFirestore().getUserIconUrl(
            userCredential.user.uid,
          ),
        });
      } catch (error) {
        console.error(error);
      }
    };
    login();
  }, []);

  const onPress = () => {
    navigation.navigate('ScenarioSelectionPage');
  };
  return (
    <>
      {socketRef.current ? (
        <ServerSelectPagePresenter
          onPress={onPress}
          rooms={rooms}
          navigation={navigation}
        />
      ) : (
        <Text>loading...</Text>
      )}
    </>
  );
};
