import React, {FC, useEffect, useState} from 'react';
import GamePresenter from './presenter';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootRoutesParamList} from '../../routes/Root';
import {useTabbar} from '../../context/tabbar.context';
import {GameProvider, useGame} from './game.context';
import {GameItem, Phase, Scenario} from '../../models/scenario';
import {useSocket} from '../../context/socket.context';

export type Props = {
  scenario: Scenario;
};

type NavigationProps = NativeStackScreenProps<RootRoutesParamList, 'GamePage'>;
const Game: FC<NavigationProps> = ({navigation, route}) => {
  const {setIsInfoVisible, setIsChatVisible, setIsSettingsVisible} =
    useTabbar();
  const {nowPhase, updateItems} = useGame();
  const {scenario} = route.params;
  const {socketRef, rooms} = useSocket();

  // 初期フェーズの設定
  const initialPhases: Phase[] = [
    {
      name: 'キャラクター選択',
      phaseId: 'character',
      numberOfSurveys: 0,
      timeLimit: 0,
    },
    {
      name: 'ストーリー読み込み',
      phaseId: 'story',
      numberOfSurveys: 0,
      timeLimit: 1,
    },
  ];

  const combinedPhases = [
    ...initialPhases,
    ...route.params.scenario.phases,
    {name: '投票', phaseId: 'vote', numberOfSurveys: 0, timeLimit: 0},
    {name: 'エンディング', phaseId: 'ending', numberOfSurveys: 0, timeLimit: 0},
    {name: '振り返り', phaseId: 'review', numberOfSurveys: 0, timeLimit: 0},
  ];

  const [phases, setPhases] = useState<Phase[]>(combinedPhases);

  useEffect(() => {
    updateItems(scenario.items);
  }, []);

  useEffect(() => {
    if (nowPhase === 1) {
      setIsInfoVisible(true);
    } else if (nowPhase === 2) {
      setIsChatVisible(true);
      setIsSettingsVisible(true);
    }
  }, [nowPhase]);

  const props = {
    scenario,
    nowPhase,
    navigation,
    phases,
  };
  return <GamePresenter {...props} />;
};

export default Game;
