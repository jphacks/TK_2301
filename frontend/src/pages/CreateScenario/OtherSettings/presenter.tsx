import React, {useState} from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import styles from './style';
import {Abstraction} from '../../../models/scenario';
import ImageSelector from '../../../components/generics/ImageSelector';

type Props = {
  targetAbstraction: Abstraction;
  onTitleChange: (text: string) => void;
  onRequiredTimeChange: (text: string) => void;
  onNumOfPlayerChange: (text: number) => void;
  onOutLineChange: (text: string) => void;
};

const OtherSettingsPresenter = ({
  onTitleChange,
  onRequiredTimeChange,
  onNumOfPlayerChange,
  onOutLineChange,
  targetAbstraction,
}: Props) => {
  const [activeTab, setActiveTab] = useState(2);

  const tabs = ['2人用', '3人用', '4人用', '5人用', '6人用']; // ここにタブを追加
  return (
    <View style={styles.container}>
      <ImageSelector
        text={'シナリオのサムネイル'}
        onPress={() => {}}
        style={styles.imageContainer}
      />

      <Text style={styles.text}>タイトル</Text>
      <TextInput
        style={styles.input}
        placeholder="タイトル"
        placeholderTextColor="#696969"
        onChangeText={onTitleChange}
        defaultValue={targetAbstraction.title}
      />

      <Text style={styles.text}>プレイ人数</Text>
      <ScrollView horizontal contentContainerStyle={styles.playerContainer}>
        {tabs.map((tab, index) => (
          <Pressable
            key={tab}
            onPress={() => {
              onNumOfPlayerChange(index + 2);
              setActiveTab(index + 2);
            }}>
            <View
              style={[styles.tab, activeTab === index + 2 && styles.activeTab]}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === index + 2 && styles.activeText,
                ]}>
                {tab}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.text}>所要時間の目安</Text>
      <View style={styles.timeRequired}>
        <TextInput
          style={[styles.input, {width: 80}]}
          placeholder="100"
          placeholderTextColor="#696969"
          defaultValue={targetAbstraction.requiredTime.toString()}
          onChangeText={onRequiredTimeChange}
        />
        <Text style={styles.minutesText}>分</Text>
      </View>

      <Text style={styles.text}>あらすじ</Text>
      <TextInput
        style={[styles.input, {height: 230}]}
        placeholderTextColor="#696969"
        multiline={true}
        defaultValue={targetAbstraction.outline}
        onChangeText={onOutLineChange}
      />
    </View>
  );
};

export default OtherSettingsPresenter;
