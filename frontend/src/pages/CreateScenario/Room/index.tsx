import React, {useEffect, useState} from "react";
import RoomPresenter from "./presenter";
import {
  MediaType,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import CreateScenaio from "..";
import {useCreateScenario} from "../createScenario";

export type Props = {
  roomId?: number; // undefinedの場合は新規作成
};

const MockItemData = [
  {
    secenarioId: 1,
    mapId: 1,
    uri: "./images/sample.png",
    name: "血がついたナイフ",
    coordinate: {
      x: 0,
      y: 0,
    },
  },
];

const Room = ({roomId}: Props) => {
  const {clueItems, setClueItems, floorMaps, setFloorMaps} =
    useCreateScenario();

  const [isSelectedImage, setIsSelectedImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    console.log("fire!!!!!!!", roomId);
    if (roomId === undefined) {
      const bufFloorMap = [...floorMaps];
      bufFloorMap.push({
        scenarioId: 1,
        uri: "",
        mapId: floorMaps.length,
        name: "新規作成",
      });
      setFloorMaps(bufFloorMap);
    }
  }, []);

  const onPressImageWithAI = () => {
    setIsSelectedImage(true);
    closeModal();
  };

  const onPressImageFromStorage = () => {
    setIsSelectedImage(true);
    closeModal();
  };

  const reverseVisible = () => {
    setShowItemModal(!showItemModal);
  };

  return (
    <RoomPresenter
      showModal={showModal}
      openModal={openModal}
      closeModal={closeModal}
      onPressImageWithAI={onPressImageWithAI}
      onPressImageFromStorage={onPressImageFromStorage}
      isSelectedImage={isSelectedImage}
      showItemModal={showItemModal}
      reverseVisible={reverseVisible}
      clueItems={clueItems}
      setClueItems={setClueItems}
      roomId={roomId}
    />
  );
};

export default Room;
