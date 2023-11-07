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
import Trick from './Trick';
import ItemInfo from './ItemInfo';
import Room from './Room';

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
    criminal,
    floorMaps,
    targetId,
  } = useCreateScenario();

  const renderContent = () => {
    switch (createState) {
      case CreateState.CliminalCharacter:
      case CreateState.OtherCharacter:
        return <CharacterSheet />;
      case CreateState.World:
        return <World />;
      case CreateState.Hint:
        return <Hint />;
      case CreateState.ItemInfo:
        return <ItemInfo />;
      case CreateState.Image:
        return <ItemInfo />;
      case CreateState.Trick:
          return <Trick />;
      case CreateState.Room:
          return <Room roomId={targetId} />;
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
      <Header navigation={navigation} />
      {renderContent()}
    </View>
  );
};

export default CreateScenarioPresenter;
