import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Props} from './index';
import styles from './style';

const HintItemPresenter = ({name, type, funcs}: Props) => {
  const [tabbed, setTabbed] = useState(false);
  return (
    <View style={[styles.container, tabbed ? styles.border : null]}>
      <Pressable
        onPress={() => {
          type == 'item' ? funcs.addItem(name) : funcs.addPhenomena(name);
          setTabbed(!tabbed);
        }}>
        <Text style={styles.name}>{name}</Text>
      </Pressable>
    </View>
  );
};

export default HintItemPresenter;
