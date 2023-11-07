import React from "react";
import {Text, View} from "react-native";
import styles from "./style";
import SquareButton from "../SquareButton";
import {CreateState, useCreateScenario} from "../createScenario";
import SquareCard from "../SquareCard";
import PurpleButton from "../../../components/generics/PurpleButton";

type Props = {
  onPress: (type: string) => void;
};

const SelectClueTypePresenter = ({onPress}: Props) => {
  const {setPhase, floorMaps, transitNextState, criminal, otherCharacters} = useCreateScenario();
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerConteienr}>
          <Text style={styles.text}>フロアマップ</Text>
          {floorMaps.length > 0 && <PurpleButton title={"追加"} />}
        </View>
        {floorMaps.length == 0 ? (
          <SquareButton type="room" onPress={() => onPress("room")} />
        ) : (
          floorMaps.map((item, index) => {
            return (
              <SquareCard
                key={index}
                label={item.name}
                onPress={() => {
                  setPhase(prev => prev + 1);
                  transitNextState(CreateState.Room);
                }}
                id={index}
                style={styles.card}
              />
            );
          })
        )}
      </View>
      <View style={styles.headerConteienr}>
        <Text style={styles.text}>証拠品／情報</Text>
      </View>
      <SquareButton type="item" onPress={() => onPress("item")} />
    </View>
  );
};

export default SelectClueTypePresenter;
