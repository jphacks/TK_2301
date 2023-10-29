import React, {useEffect, useState} from 'react';
import TabbarPresenter from './presenter';
import {ImageSourcePropType} from 'react-native';
import {useTabbar} from '../../../context/tabbar.context';
import {useUser} from '../../../context/user.context';
import {storage} from 'react-native-firebase';

type Props = {
  isGame: boolean;
  navigation?: any;
};
const Tabbar = ({isGame, navigation}: Props) => {
  const {user} = useUser();
  const [icon, setIcon] = useState<string>('');
  const {
    isInfoVisible,
    isChatVisible,
    isSettingsVisible,
    setShowInfo,
    setShowChat,
    setShowSettings,
  } = useTabbar();

  const icons = isGame
    ? [
        {
          path: require('./icons/mic.png'),
          title: '',
          opacity: 1,
          onPress: () => {},
        },
        {
          path: require('./icons/scenario.png'),
          title: '情報',
          opacity: 0.5,
          onPress: () => {
            if (isInfoVisible) {
              setShowInfo(true);
            }
          },
        },
        {
          path: require('./icons/chat.png'),
          title: 'チャット',
          opacity: 0.5,
          onPress: () => {
            if (isChatVisible) {
              setShowChat(true);
            }
          },
        },
        {
          path: require('./icons/setting.png'),
          title: '設定',
          opacity: 0.5,
          onPress: () => {
            if (isSettingsVisible) {
              setShowSettings(true);
            }
          },
        },
      ]
    : [
        {
          path: require('./icons/home.png'),
          title: 'ホーム',
          opacity: 1,
          onPress: () => {},
        },
        {
          path: require('./icons/scenario.png'),
          title: '情報',
          opacity: 0.5,
          onPress: () => {
            if (isInfoVisible) {
              setShowInfo(true);
            }
          },
        },
        {
          path: require('./icons/add.png'),
          title: '作成',
          opacity: 0.5,
          onPress: () => {
            navigation.navigate('CreateScenario');
          },
        },
        {
          path: require('./icons/chat.png'),
          title: '設定',
          opacity: 0.5,
          onPress: () => {},
        },
        {
          path: icon,
          title: 'ユーザー',
          opacity: 0.5,
          onPress: () => {},
        },
      ];

  if (isInfoVisible) {
    (icons[1].path = require('./icons/scenario_active.png')),
      (icons[1].opacity = 1);
  }

  if (isChatVisible) {
    icons.map(icon => {
      if (icon.title === 'チャット') {
        icon.opacity = 1;
      }
    });
  }

  if (isSettingsVisible) {
    icons.map(icon => {
      if (icon.title === '設定') {
        icon.opacity = 1;
      }
    });
  }

  return <TabbarPresenter icons={icons} isGame={isGame} />;
};

export default Tabbar;
