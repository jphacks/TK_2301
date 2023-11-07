import React, {useEffect, useState} from 'react';
import HeaderPresenter from './presenter';
import {CreateState, CharacterType, useCreateScenario} from '../createScenario';
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
    tabId,
    editingCharacter,
    nowCharacterType,
    setCriminal,
    setOtherCharacters,
    transitNextState,
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
    if (pageStack.length === 0) {
      navigation.navigate('ServerSelect');
    }

    if (phase === 2) {
      if (tabId === 1 && editingCharacter) {
        switch (nowCharacterType) {
          case CharacterType.Criminal:
            setCriminal(editingCharacter);
            break;
          case CharacterType.Other:
            setOtherCharacters(prev => [...prev, editingCharacter]);
            break;
        }
      }
      transitNextState(CreateState.Default); // トリック選択からキャラクターシートに遷移したときに、transitPrevState()を呼ぶと、トリック選択に戻ってしまうので、ここでtransitNextState()を呼ぶ
      setPhase(phase - 1);

      setIsCreatingCharacter(false);

      return;
    }
    if (phase > 1) setPhase(phase - 1);
    else navigation.navigate('ServerSelect');

    transitPrevState();
  };

  return <HeaderPresenter back={back} text={headerText} />;
};

export default Header;
