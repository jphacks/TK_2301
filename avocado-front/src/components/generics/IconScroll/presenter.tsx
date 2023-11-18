import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './style';
import InteractiveCircularIcon from '../InteractiveCircularIcon';
import {Props as ContainerProps} from './index';
import {useSocket} from '../../../context/socket.context';

type Props = {
  url: any;
} & ContainerProps;

const IconScrollPresenter = () => {
  const {sessionUsers} = useSocket();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {sessionUsers.map((user, index) => {
          return (
            <InteractiveCircularIcon
              key={index}
              id={user.user_id}
              name={user.user_name}
              isCirculated={true}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default IconScrollPresenter;
