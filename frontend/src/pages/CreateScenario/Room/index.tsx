import React, {useState} from "react";
import RoomPresenter from "./presenter";
import {
  MediaType,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import CreateScenaio from "..";
import { useCreateScenario } from "../createScenario";

export type Props = {};

const MockItemData = [
  {
    secenarioId: 1,
    mapId: 1,
    uri: "./images/sample.png",
    name: "血がついたナイフ",
    coordinate: {
      x: 0, 
      y: 0
    },
  },
];

const Room = ({}: Props) => {
  const {clueItems, setClueItems} = useCreateScenario();

  const [isSelectedImage, setIsSelectedImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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
    />
  );
};

export default Room;
