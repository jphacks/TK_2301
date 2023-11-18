import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './style';
import InteractiveCircularIcon from '../InteractiveCircularIcon';
import {Props as ContainerProps} from './index';
import {useSocket} from '../../../context/socket.context';
import {createScenarioFirestore} from '../../../api/firebase/firestore';

type Props = {
  url: any;
} & ContainerProps;

const IconScrollPresenter = () => {
  const {sessionUsers} = useSocket();
  const [iconUrls, setIconUrls] = useState<string[]>([]);

  useEffect(() => {
    const bufArray: string[] = [];

    const getUrl = async () => {
      for (let i = 0; i < sessionUsers.length; i++) {
        const user = sessionUsers[i];
        const url = await createScenarioFirestore().getUserIconUrl(user.user_id);
        bufArray.push(url);
      }
      setIconUrls(bufArray);
    };

    getUrl();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {iconUrls.map((url, index) => {
          return (
            <InteractiveCircularIcon key={index} url={url} name={'yamashita'} />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default IconScrollPresenter;
