import React, {useEffect} from 'react';
import {Modal, ScrollView, Text, View} from 'react-native';
import TopHeader from '../../components/generics/TopHeader';
import IconScroll from '../../components/generics/IconScroll';
import Tabbar from '../../components/generics/Tabbar';
import {Props as ContainerProps} from './index';
import styles from './style';
import Characters from '../../components/generics/Characters';
import GameHeader from './GameHeader';
import SelectCharacterCard from './SelectCharacterCard';
import FloorMap from './FloorMap';
import {useTabbar} from '../../context/tabbar.context';
import Info from './Info';
import Vote from './Vote';
import {GameItem, Phase} from '../../models/scenario';

type Props = {
  nowPhase: number;
  navigation: any;
  phases: Phase[];
} & ContainerProps;

const GamePresenter = ({scenario, nowPhase, navigation, phases}: Props) => {
  const {showInfo} = useTabbar();
  const renderContent = () => {
    switch (phases[nowPhase].phaseId) {
      case 'character':
        return (
          <ScrollView style={styles.normalContainer}>
            {scenario.characters.map((character, index) => (
              <View key={index} style={{paddingBottom: 10}}>
                <SelectCharacterCard key={index} character={character} />
              </View>
            ))}
          </ScrollView>
        );
      case 'story':
        return (
          <View style={styles.normalContainer}>
            <Text style={{color: '#fff'}}>
              画面下部の「情報」にキャラクターシートが配布されました。ミュートにした状態で読み込んで下さい。
            </Text>
          </View>
        );
      case 'vote':
        return (
          <View style={styles.normalContainer}>
            <Vote characters={scenario.characters} />
          </View>
        );
      case 'ending':
        return (
          <View style={styles.normalContainer}>
            <Text style={{color: '#fff'}}>エンディングです</Text>
          </View>
        );
      case 'review':
        return (
          <View style={styles.normalContainer}>
            <Text style={{color: '#fff'}}>振り返りです</Text>
          </View>
        );
      default:
        return (
          <View style={styles.floorMapContainer}>
            <FloorMap
              floorMaps={scenario.floorMaps}
              numberOfSurveys={phases[nowPhase].numberOfSurveys}
            />
          </View>
        );
    }
  };
  return (
    <View style={{flex: 1}}>
      <GameHeader
        props={{
          phase: phases[nowPhase],
          navigation,
        }}
      />
      <IconScroll />
      {renderContent()}
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={showInfo}>
        <Info scenario={scenario} />
      </Modal>
      <Tabbar isGame={true} />
      {/*showInfo && <Info />*/}
    </View>
  );
};

export default GamePresenter;
