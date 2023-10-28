import React, {FC} from 'react';
import {Text, Button} from 'react-native';
import type {RootRoutesParamList} from '../../routes/Root';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootRoutesParamList, 'HomePage'>;
export const HomePage: FC<Props> = ({navigation}) => {
  return (
    <>
      <Text>HOME</Text>
      <Button
        onPress={() => navigation.push('DetailPage')}
        title="Settings page"
      />
    </>
  );
};
