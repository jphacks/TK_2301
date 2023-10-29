import React from 'react';
import ServerCard from '../../components/generics/ServerCard';
import {ScrollView, Text, View} from 'react-native';
import styles from './style';
import PrimaryButton from '../../components/generics/PrimaryButton';
import Tabbar from '../../components/generics/Tabbar';
import {Room} from '../../type';

type Props = {
  onPress: () => void;
  rooms: Room[];
  navigation: any;
};

export const ServerSelectPagePresenter = ({
  onPress,
  rooms,
  navigation,
}: Props) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>フレンドのサーバー</Text>
        {rooms.map((room, index) => {
          return (
            <ServerCard
              key={index}
              serverName={room.owner.user_name}
              serverId={room.room_id}
              userList={room.users}
              navigation={navigation}></ServerCard>
          );
        })}
      </ScrollView>
      <View style={styles.fix}>
        <PrimaryButton
          text={'自分のサーバーを作成してあそぶ'}
          onPress={onPress}
          width={320}
        />
      </View>

      <Tabbar isGame={false} navigation={navigation} />
    </View>
  );
};
