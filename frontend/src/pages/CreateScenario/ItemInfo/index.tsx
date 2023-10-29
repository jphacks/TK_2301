import React, {useState} from 'react';
import ItemInfoPresenter from './presenter';
import {useCreateScenario} from '../createScenario';

const ItemInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const {setIsImageCreate, setIsItemInfo, setPhase} = useCreateScenario();
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const next = () => {
    setPhase(prev => prev + 1);
    setIsItemInfo(false);
    setIsImageCreate(true);
  };
  return (
    <ItemInfoPresenter
      showModal={showModal}
      openModal={openModal}
      closeModal={closeModal}
      next={next}
    />
  );
};

export default ItemInfo;
