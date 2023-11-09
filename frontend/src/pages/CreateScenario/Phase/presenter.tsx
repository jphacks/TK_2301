import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './style';
import {useCreateScenario} from '../createScenario';

const PhasePresenter = () => {
  const {phaseData, setPhaseData, targetId} = useCreateScenario();
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>フェーズの名前</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#696969"
          placeholder="フェーズ"
          onChangeText={name => {
            if (targetId === undefined || typeof targetId === 'number') {
              return;
            }

            const data = phaseData.get(targetId);
            if (data === undefined) {
              return;
            }

            data.name = name;

            phaseData.set(targetId, data);
            setPhaseData(phaseData);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>調査可能な回数</Text>
        <View style={styles.smallInput}>
          <TextInput
            style={[styles.input, {width: 80}]}
            placeholder="2"
            placeholderTextColor="#696969"
            onChangeText={number => {
              if (targetId === undefined || typeof targetId === 'number') {
                return;
              }

              const data = phaseData.get(targetId);
              if (data === undefined) {
                return;
              }

              data.numberOfSurveys = Number(number);

              phaseData.set(targetId, data);
              setPhaseData(phaseData);
            }}
          />
          <Text style={styles.unit}>回</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>調査可能な時間</Text>
        <View style={styles.smallInput}>
          <TextInput
            style={[styles.input, {width: 80}]}
            placeholder="10"
            placeholderTextColor="#696969"
            onChangeText={number => {
              if (targetId === undefined || typeof targetId === 'number') {
                return;
              }

              const data = phaseData.get(targetId);
              if (data === undefined) {
                return;
              }

              data.timeLimit = Number(number);

              phaseData.set(targetId, data);
              setPhaseData(phaseData);
            }}
          />
          <Text style={styles.unit}>分</Text>
        </View>
      </View>
    </View>
  );
};

export default PhasePresenter;
