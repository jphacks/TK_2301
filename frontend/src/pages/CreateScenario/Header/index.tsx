import React, {useEffect, useState} from 'react';
import HeaderPresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';
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
  const {
    phase,
    setPhase,
    setIsCreatingCharacter,
    createState,
    pageStack,
    transitPrevState,
  } = useCreateScenario();
  const [headerText, setHeaderText] = useState<string>('シナリオ作成');
  useEffect(() => {
    switch (createState) {
      case CreateState.CliminalCharacter:
      case CreateState.OtherCharacter:
        setHeaderText('キャラクターシート');
        break;
      case CreateState.World:
        setHeaderText('世界観を決める');
        break;
      case CreateState.Hint:
        setHeaderText('ヒントを選ぶ');
        break;
      case CreateState.Trick:
        setHeaderText('使用するトリックを選ぶ');
        break;
      case CreateState.ItemInfo:
        setHeaderText('証拠品/情報');
        break;
      case CreateState.Image:
        setHeaderText('画像作成');
        break;
      default:
        setHeaderText('シナリオ作成');
        break;
    }
  }, [createState]);

  const back = () => {
    transitPrevState();

    if (pageStack.length === 0) {
      navigation.navigate('ServerSelect');
    }

    if (phase === 2) {
      setIsCreatingCharacter(false);
    }
    if (phase > 1) setPhase(phase - 1);
    else navigation.navigate('ServerSelect');
  };
  return <HeaderPresenter back={back} text={headerText} />;
};

export default Header;
