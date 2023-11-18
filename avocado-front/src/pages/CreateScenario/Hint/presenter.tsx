import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './style';
import {useCreateScenario} from '../createScenario';
import HintItem from './HintItem';
import PrimaryButton from '../../../components/generics/PrimaryButton';
import Spinner from 'react-native-loading-spinner-overlay';
import FetchingModal from '../FetchingModal';

type Props = {
  funcs: {
    addItem: (item: string) => void;
    addPhenomena: (phenomena: string) => void;
  };
  next: () => void;
};

const HintPresenter = ({funcs, next}: Props) => {
  const {recievedItems, recievedPhenomena} = useCreateScenario();
  return (
    <ScrollView>
      <FetchingModal textContent={'生成中...'} />

      <View style={styles.container}>
        <Text style={styles.text}>
          犯行に関わるアイテムを1~5個選んでください
        </Text>
        <View
          style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 40}}>
          {recievedItems?.map((item, index) => (
            <HintItem key={index} name={item} type={'item'} funcs={funcs} />
          ))}
        </View>
        <Text style={styles.text}>
          犯行に関わる現象を1~5個以上選んでください
        </Text>
        <View
          style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 60}}>
          {recievedPhenomena?.map((phenomena, index) => (
            <HintItem
              key={index}
              name={phenomena}
              type={'phenomena'}
              funcs={funcs}
            />
          ))}
        </View>
        <PrimaryButton
          text="トリックの仕組みを生成"
          onPress={next}
          width={320}
          style={{marginBottom: 40}}
        />
      </View>
    </ScrollView>
  );
};

export default HintPresenter;
