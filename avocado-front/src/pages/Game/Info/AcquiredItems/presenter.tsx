import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useGame} from '../../game.context';
import {GameItem} from '../../../../models/scenario';
import styles from './style';
import ItemCard from './ItemCard';
import CharacterList from './CharacterList';
import {Props as ContainerProps} from './index';

type Props = {
  onPress: (item: GameItem) => void;
  reshapedMyItems: GameItem[];
  showMyItem: boolean;
  item: GameItem | undefined;
  setShowMyItem: React.Dispatch<React.SetStateAction<boolean>>;
} & ContainerProps;

const AcquiredItemsPresenter = ({
  onPress,
  reshapedMyItems,
  showMyItem,
  item,
  setShowMyItem,
  scenarioCharacters,
}: Props) => {
  const {usersOnTheFloor, isShowSelectTransferredCharacters} = useGame();
  return (
    <View>
      {reshapedMyItems.map((myItem, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => onPress(myItem)}
            style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={{uri: myItem.uri}} style={styles.image} />
              <Text style={styles.itemName}>{myItem.name}</Text>
            </View>
            <Image source={require('./ellipses.png')} style={styles.ellipses} />
          </Pressable>
        );
      })}

      {showMyItem && <ItemCard item={item} setShowMyItem={setShowMyItem} />}
      {isShowSelectTransferredCharacters && (
        <CharacterList scenarioCharacters={scenarioCharacters} />
      )}
    </View>
  );
};

export default AcquiredItemsPresenter;
