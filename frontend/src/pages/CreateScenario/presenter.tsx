import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Header from './Header';
import {TabBar, TabView} from 'react-native-tab-view';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootRoutesParamList} from '../../routes/Root';
import {CreateState, useCreateScenario} from './createScenario';
import CharacterSheet from './CharacterSheet';
import World from './World';
import Hint from './Hint';
import TrickSelector from './TrickSelector';
import ItemInfo from './ItemInfo';
import Room from './Room';
import Phase from './Phase';
import uuid from 'react-native-uuid';
import ImageCreate from './ImageCreate';
import ConfirmModal from './ConfirmModal';

type Props = {
  tabViewProps: {
    index: number;
    routes: {
      key: string;
      title: string;
    }[];
    renderScene: any;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    initialLayout: {width: number};
  };
  navigation: NativeStackNavigationProp<
    RootRoutesParamList,
    'CreateScenario',
    undefined
  >;
};

const CreateScenarioPresenter = ({tabViewProps, navigation}: Props) => {
  const {
    createState,
    scenarioId,
    setScenarioId,
    setIsNewScenario,
    uploadScenarioData,
  } = useCreateScenario();

  useEffect(() => {
    if (scenarioId === '') {
      const newScenarioId = uuid.v4().toString();

      setIsNewScenario(true);
      setScenarioId(newScenarioId);

      return;
    }
  }, []);
  const renderContent = () => {
    switch (createState) {
      case CreateState.CriminalsCharacter:
      case CreateState.OtherCharacter:
        return <CharacterSheet />;
      case CreateState.World:
        return <World />;
      case CreateState.Hint:
        return <Hint />;
      case CreateState.ItemInfo:
        return <ItemInfo />;
      case CreateState.Image:
        return <ImageCreate />;
      case CreateState.Trick:
        return <TrickSelector />;
      case CreateState.Room:
        return <Room />;
      case CreateState.Phase:
        return <Phase />;
      default:
        return (
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: initialLayout.width}}
            renderTabBar={renderTabBar}
          />
        );
    }
  };

  const {index, routes, renderScene, setIndex, initialLayout} = tabViewProps;
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#5865F2'}}
      style={styles.tabBar}
      labelStyle={styles.label}
      scrollEnabled={true}
      layout={{
        width: 0,
        height: 0,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <ConfirmModal
        titleTextContent={'シナリオを投稿する'}
        buttonTextContent={'投稿する'}
        onPressConfirm={uploadScenarioData}
      />
      <Header navigation={navigation} />
      {renderContent()}
    </View>
  );
};

export default CreateScenarioPresenter;
