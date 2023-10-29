import React from 'react';
import {View} from 'react-native';
import Header from './Header';
import {TabBar, TabView} from 'react-native-tab-view';
import styles from './style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootRoutesParamList} from '../../routes/Root';
import {useCreateScenario} from './createScenario';
import CharacterSheet from './CharacterSheet';
import World from './World';
import Hint from './Hint';
import Trick from './Trick';
import ItemInfo from './ItemInfo';
import ImageCreate from './ImageCreate';

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
    isCreatingCharacter,
    isItemInfo,
    isWorld,
    isHint,
    isTrick,
    isImageCreate,
  } = useCreateScenario();

  const renderContent = () => {
    if (isCreatingCharacter) return <CharacterSheet />;
    else if (isWorld) return <World />;
    else if (isHint) return <Hint />;
    else if (isTrick) return <Trick />;
    else if (isItemInfo) return <ItemInfo />;
    else if (isImageCreate) return <ImageCreate />;
    else
      return (
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: initialLayout.width}}
          renderTabBar={renderTabBar}
        />
      );
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
