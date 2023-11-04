import React, {useState} from 'react';
import ItemInfoPresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';

const ItemInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const {setPhase, setCreateState} = useCreateScenario();
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const next = () => {
    setPhase(prev => prev + 1);
    setCreateState(CreateState.Image);
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
