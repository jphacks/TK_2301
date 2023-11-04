import React, {useState} from 'react';
import CreateScenarioPresenter from './presenter';
import {SceneMap} from 'react-native-tab-view';
import {View, useWindowDimensions} from 'react-native';
import {CreateScenarioProvider, useCreateScenario} from './createScenario';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootRoutesParamList} from '../../routes/Root';
import SelectCharacterType from './SelectCharacterType';
import SelectClueType from './SelectClueType';

type Props = NativeStackScreenProps<RootRoutesParamList, 'CreateScenario'>;
const CreateScenaio = ({navigation}: Props) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'キャラクター作成'},
    {key: 'second', title: '手がかり作成'},
    {key: 'third', title: 'その他の作成'},
  ]);

  const renderScene = SceneMap({
    first: () => <SelectCharacterType />,
    second: () => <SelectClueType />,
    third: () => <View></View>,
  });

  const tabViewProps = {
    index,
    routes,
    renderScene,
    setIndex,
    initialLayout: {width: layout.width},
  };
  return (
    <CreateScenarioProvider>
      <CreateScenarioPresenter
        tabViewProps={tabViewProps}
        navigation={navigation}
      />
    </CreateScenarioProvider>
  );
};

export default CreateScenaio;
