import React, {FC, useState} from 'react';
import InfoPresenter from './presenter';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useTabbar} from '../../../context/tabbar.context';
import {useWindowDimensions} from 'react-native';
import Characters from './Characters';
import About from './About';
import Purpose from './Purpose';
import {Scenario} from '../../../models/scenario';
import AcquiredItems from './AcquiredItems';

export type CharactersProps = {
  characters: {
    nameKanji: string;
    nameKana: string;
    age: number;
    icon: any;
    profession: string;
    description: string;
    about: string;
    purpose: string;
  }[];
};

export type Props = {
  scenario: Scenario;
};

const Info: FC<Props> = React.memo(props => {
  const {scenario} = props;
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: '登場人物'},
    {key: 'second', title: 'あなたについて'},
    {key: 'third', title: 'あなたの目標'},
    {key: 'fourth', title: 'あなたの持ち物'},
  ]);
  const {setShowInfo} = useTabbar();
  const close = () => {
    setShowInfo(false);
  };

  const renderScene = SceneMap({
    first: () => <Characters characters={scenario.characters} />,
    second: () => <About characters={scenario.characters} />,
    third: () => <Purpose characters={scenario.characters} />,
    fourth: () => <AcquiredItems scenarioCharacters={scenario.characters} />,
  });

  const tabViewProps = {
    index,
    routes,
    renderScene,
    setIndex,
    initialLayout: {width: layout.width},
  };
  return (
    <InfoPresenter
      close={close}
      tabViewProps={tabViewProps}
      scenario={scenario}
    />
  );
});

export default Info;
