import React from 'react';
import {Pressable, Text, View, Image, ScrollView} from 'react-native';
import styles from './style';
import ScenarioItem from '../ScenarioItem';
import {Scenario} from '../../../models/scenario';

type Props = {
  title: string;
  navigation: any;
  scenarios: Scenario[];
};

const ScenarioSelectorPresenter = ({title, navigation, scenarios}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.title}>{title}</Text>
        <Pressable style={styles.viewAllButton}>
          <Image source={require('./icons/く.png')} />
          <Text style={styles.viewAllButtonText}>すべて見る</Text>
        </Pressable>
      </View>
      <ScrollView horizontal>
        {scenarios.map((scenario, index) => {
          return (
            <ScenarioItem
              key={index}
              scenario={scenario}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ScenarioSelectorPresenter;
