import React, {useEffect, useState} from 'react';
import HeaderPresenter from './presenter';
import {useCreateScenario} from '../createScenario';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootRoutesParamList} from '../../../routes/Root';

type Props = {
  navigation: NativeStackNavigationProp<
    RootRoutesParamList,
    'CreateScenario',
    undefined
  >;
};

const Header = ({navigation}: Props) => {
  const {tabId, setTabId, phase, setPhase, setIsCreatingCharacter} =
    useCreateScenario();
  const [headerText, setHeaderText] = useState<string>('シナリオ作成');
  useEffect(() => {
    if (tabId === 1 && phase === 1) setHeaderText('シナリオ作成');
    else if (tabId === 1 && phase === 2) setHeaderText('キャラクターシート');
    else if (tabId === 1 && phase === 3) setHeaderText('世界観を決める');
    else if (tabId === 1 && phase === 4) setHeaderText('ヒントを選ぶ');
    else if (tabId === 1 && phase === 5)
      setHeaderText('使用するトリックを選ぶ');
    else if (tabId === 2 && phase === 1) setHeaderText('シナリオを作成');
    else if (tabId === 2 && phase === 2) setHeaderText('証拠品/情報');
    else if (tabId === 2 && phase === 3) setHeaderText('画像作成');
  }, [tabId, phase]);

  const back = () => {
    if (phase === 2) {
      setIsCreatingCharacter(false);
    }
    if (phase > 1) setPhase(phase - 1);
    else navigation.navigate('ServerSelect');
  };
  return <HeaderPresenter back={back} text={headerText} />;
};

export default Header;
