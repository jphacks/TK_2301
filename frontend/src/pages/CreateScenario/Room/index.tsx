import React, {useEffect, useState} from 'react';
import RoomPresenter from './presenter';
import {useCreateScenario} from '../createScenario';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import {FloorMap} from 'src/models/scenario';
import {pickSingleImageFromLocalStorage} from '../utility';

const Room = () => {
  const {items, setItems, floorMaps, setFloorMaps, setTargetId, targetId} =
    useCreateScenario();

  const [isSelectedImage, setIsSelectedImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [targetUri, setTargetUri] = useState('');

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    // 新規作成時
    if (targetId === '') {
      const newMapId = uuid.v4().toString();

      floorMaps.set(newMapId, {
        name: '新規作成',
        mapId: newMapId,
        uri: '',
      });

      setTargetId(newMapId);
      setFloorMaps(floorMaps);

      return;
    }

    const target = floorMaps.get(targetId || '')?.uri || '';

    if (target.startsWith('floor_maps/')) {
      // 既にFireStorageに保存されている場合
      const get = async () => {
        const uri = await storage().ref(target).getDownloadURL();
        setTargetUri(uri);
        setIsSelectedImage(true);
      };

      get();
    } else if (target.startsWith('file://')) {
      // まだFireStorageに保存されていない場合
      setTargetUri(target);
      setIsSelectedImage(true);
    }

    // TODO: 画像が表示されるまで間隔があるので、それまで画像ピッカーが表示されないようにする
  }, []);

  const onPressImageWithAI = () => {
    setIsSelectedImage(true);
    closeModal();
  };

  const onPressImageFromStorage = async () => {
    const selectedUri = await pickSingleImageFromLocalStorage();

    if (!selectedUri || !targetId) return;

    const map: FloorMap = floorMaps.get(targetId) as FloorMap;
    map.uri = selectedUri;
    floorMaps.set(targetId, map);

    setFloorMaps(floorMaps);
    setTargetUri(selectedUri);

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
      targetUri={targetUri}
    />
  );
};

export default Room;
