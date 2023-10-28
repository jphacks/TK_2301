import React from "react"
import { Pressable, Text, View, Image } from "react-native"
import { Props as ContainerProps, FloorProps } from "./index"
import styles from "./style"
import Floor from "../Floor"

type Props = {
  enter: (floorInfo: FloorProps) => void
  floor: FloorProps | undefined
  isFloorEntered: boolean
  exit: () => void
  surveysCount: number
  minusSurveysCount: () => void
} & ContainerProps

const FloorMapPresenter = ({
  floorMap,
  enter,
  isFloorEntered,
  floor,
  exit,
  surveysCount,
  minusSurveysCount
}: Props) => {
  return (
    <View>
      <View style={styles.header}>
        {isFloorEntered && (
          <Pressable onPress={exit} style={styles.backContainer}>
            <Image style={styles.backIcon} source={require("./back.png")} />
          </Pressable>
        )}
        <Text style={styles.where}>
          {isFloorEntered && floor ? floor?.floorName : "フロアマップ"}
        </Text>
      </View>

      {isFloorEntered && floor ? (
        <Floor
          floor={floor}
          surveysCount={surveysCount}
          minusSurveysCount={minusSurveysCount}
        />
      ) : (
        <>
          {floorMap.map((floor, index) => {
            return (
              <Pressable
                key={index}
                style={styles.container}
                onPress={() => enter(floor)}
              >
                <Text style={styles.text}>{floor.floorName}</Text>
                <Image source={require("./<.png")} />
              </Pressable>
            )
          })}
        </>
      )}
    </View>
  )
}

export default FloorMapPresenter
