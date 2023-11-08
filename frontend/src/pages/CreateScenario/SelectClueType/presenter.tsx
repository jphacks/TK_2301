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
  const {setPhase, floorMaps, transitNextState} = useCreateScenario();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerConteienr}>
          <Text style={styles.text}>フロアマップ</Text>
          { floorMaps.size > 0 && (
            <PurpleButton
              title={"追加"}
              onClick={() => {
                setPhase(prev => prev + 1);
                transitNextState(CreateState.Room);
              }}
            />
          )}
        </View>
        { floorMaps.size == 0 ? (
          <SquareButton type="room" onPress={() => onPress("room")} />
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
      <View style={styles.headerConteienr}>
        <Text style={styles.text}>証拠品／情報</Text>
      </View>
      <SquareButton type="item" onPress={() => onPress("item")} />
    </View>
  );
};

export default SelectClueTypePresenter;
