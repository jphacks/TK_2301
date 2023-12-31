import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './style';
import SquareButton from '../SquareButton';
import {CreateState, useCreateScenario} from '../createScenario';
import SquareCard from '../SquareCard';
import PurpleButton from '../../../components/generics/PurpleButton';
import PhaseCard from '../PhaseCard';

type Props = {
  onPress: (type: string) => void;
};

const SelectClueTypePresenter = ({onPress}: Props) => {
  const {setPhase, floorMaps, transitNextState, phaseData, items} =
    useCreateScenario();

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.text}>フロアマップ</Text>
          {floorMaps.size > 0 && (
            <PurpleButton
              title={'追加する'}
              onClick={() => {
                setPhase(prev => prev + 1);
                transitNextState(CreateState.Room);
              }}
            />
          )}
        </View>
        {floorMaps.size == 0 ? (
          <SquareButton type="room" onPress={() => onPress('room')} />
        ) : (
          Array.from(floorMaps, ([key, item]) => {
            return (
              <SquareCard
                key={key}
                label={item.name}
                onPress={() => {
                  setPhase(prev => prev + 1);
                  transitNextState(CreateState.Room, key);
                }}
                id={key}
                style={styles.card}
              />
            );
          })
        )}
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>証拠品／情報</Text>
        {items.size > 0 && (
          <PurpleButton
            title={'追加する'}
            onClick={() => {
              setPhase(prev => prev + 1);
              transitNextState(CreateState.ItemInfo);
            }}
          />
        )}
      </View>
      {items.size == 0 ? (
        <SquareButton type="item" onPress={() => onPress('item')} />
      ) : (
        Array.from(items, ([key, item]) => {
          return (
            <SquareCard
              key={key}
              label={item.name}
              onPress={() => {
                setPhase(prev => prev + 1);
                transitNextState(CreateState.ItemInfo, key);
              }}
              id={key}
              style={styles.card}
            />
          );
        })
      )}

      <View style={styles.headerContainer}>
        <Text style={styles.text}>フェーズ</Text>
        <PurpleButton
          title={'追加する'}
          onClick={() => {
            setPhase(prev => prev + 1);
            transitNextState(CreateState.Phase);
          }}
        />
      </View>
      {phaseData.size > 0 && (
        <View>
          {Array.from(phaseData, ([key, value]) => (
            <PhaseCard
              phase={value}
              key={key}
              onPress={() => {
                setPhase(prev => prev + 1);
                transitNextState(CreateState.Phase, key);
              }}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default SelectClueTypePresenter;
