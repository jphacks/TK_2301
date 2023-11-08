import React, {useState} from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import styles from './style';

const OtherSettingsPresenter = () => {
  const [activeTab, setActiveTab] = useState(2);

  const tabs = ['2人用', '3人用', '4人用', '5人用', '6人用']; // ここにタブを追加
  return (
    <View style={styles.container}>
      <Text style={styles.text}>タイトル</Text>
      <TextInput
        style={styles.input}
        placeholder="タイトル"
        placeholderTextColor="#696969"
      />

      <Text style={styles.text}>プレイ人数</Text>
      <ScrollView horizontal contentContainerStyle={styles.playerContainer}>
        {tabs.map((tab, index) => (
          <Pressable key={tab} onPress={() => setActiveTab(index + 2)}>
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
        />
        <Text style={styles.minutesText}>分</Text>
      </View>

      <Text style={styles.text}>あらすじ</Text>
      <TextInput
        style={[styles.input, {height: 230}]}
        placeholderTextColor="#696969"
        multiline={true}
      />
    </View>
  );
};

export default OtherSettingsPresenter;
