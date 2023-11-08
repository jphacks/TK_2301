import React, {useEffect, useState} from "react";
import RoomPresenter from "./presenter";
import {useCreateScenario} from "../createScenario";
import uuid from "react-native-uuid";

export type Props = {
  roomId?: number | string; // undefinedの場合は新規作成
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
  const {items, setItems, floorMaps, setFloorMaps, setTargetId} =
    useCreateScenario();

  const [isSelectedImage, setIsSelectedImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if (roomId === undefined) {
      const newMapId = uuid.v4().toString();

      floorMaps.set(newMapId, {
        name: "新規作成",
        mapId: newMapId,
        uri: ""
      });

      setTargetId(newMapId);
      setFloorMaps(floorMaps);
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
      items={items}
      setItems={setItems}
      roomId={roomId}
    />
  );
};

export default Room;
