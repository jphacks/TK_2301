import React, {FC} from 'react';
import {Text} from 'react-native';
import type {RootRoutesParamList} from '../../routes/Root';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootRoutesParamList, 'DetailPage'>;
export const SettingsPage: FC<Props> = () => {
  return <Text>Detail</Text>;
};
