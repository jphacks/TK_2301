import React from 'react';
import {ScrollView, View} from 'react-native';
import {useCreateScenario} from '../createScenario';
import TrickItem from './TrickItem';
import styles from './style';
import PrimaryButton from '../../../components/generics/PrimaryButton';

type Props = {
  selectedTricks: string[];
  setSelectedTricks: React.Dispatch<React.SetStateAction<string[]>>;
  onPress: () => void;
};

const TrickPresenter = ({
  selectedTricks,
  setSelectedTricks,
  onPress,
}: Props) => {
  const {tricks} = useCreateScenario();
  return (
    <ScrollView>
      <View style={styles.container}>
        {tricks.map((trick, index) => {
          return (
            <TrickItem
              key={index}
              trick={trick}
              setSelectedTricks={setSelectedTricks}
            />
          );
        })}

        <View style={selectedTricks.length === 0 ? {opacity: 0.3} : null}>
          <PrimaryButton text="トリックを追加" width={320} onPress={onPress} />
        </View>
      </View>
    </ScrollView>
  );
};

export default TrickPresenter;
