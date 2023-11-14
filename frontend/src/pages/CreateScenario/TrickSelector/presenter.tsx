import React from 'react';
import {ScrollView, View} from 'react-native';
import {useCreateScenario} from '../createScenario';
import TrickItem from './TrickItem';
import styles from './style';
import PrimaryButton from '../../../components/generics/PrimaryButton';
import {Trick} from '../../../models/scenario';
import Spinner from 'react-native-loading-spinner-overlay';
import FetchingModal from '../FechingModal';

type Props = {
  selectedItemTricks: Trick[];
  selectedTriviaTricks: Trick[];
  setSelectedItemTricks: React.Dispatch<React.SetStateAction<Trick[]>>;
  setSelectedTriviaTricks: React.Dispatch<React.SetStateAction<Trick[]>>;
  onPress: () => void;
};

const TrickSelectorPresenter = ({
  selectedItemTricks,
  selectedTriviaTricks,
  setSelectedItemTricks,
  setSelectedTriviaTricks,
  onPress,
}: Props) => {
  const {itemTricks, triviaTricks} = useCreateScenario();
  return (
    <ScrollView>
      <FetchingModal textContent={'生成中...'} />

      <View style={styles.container}>
        {itemTricks.map((trick, index) => {
          return (
            <TrickItem
              key={index}
              trick={trick}
              type="item"
              setSelectedItemTricks={setSelectedItemTricks}
            />
          );
        })}

        {triviaTricks.map((trick, index) => {
          return (
            <TrickItem
              key={index}
              trick={trick}
              type="trivia"
              setSelectedTriviaTricks={setSelectedTriviaTricks}
            />
          );
        })}

        <View
          style={
            selectedItemTricks.length === 0 && selectedTriviaTricks
              ? {opacity: 0.3}
              : null
          }>
          <PrimaryButton
            text="キャラクターシートを作成"
            width={320}
            onPress={onPress}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TrickSelectorPresenter;
