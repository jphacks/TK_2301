import React, {useEffect, useState} from 'react';
import ItemInfoPresenter from './presenter';
import {CreateState, useCreateScenario} from '../createScenario';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
import {ImageType, Item, ItemCategory} from '../../../models/scenario';
import {pickSingleImageFromLocalStorage} from '../utility';

const ItemInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSelectedImage, setIsSelectedImage] = useState(false);
  const [itemType, setItemType] = React.useState<ItemCategory>('');

  const {
    setPhase,
    setCreateState,
    items,
    setItems,
    targetId,
    setTargetId,
    transitNextState,
    setTargetImageURL,
    setTargetImageType,
  } = useCreateScenario();
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const onPressImageWithAI = async () => {
    // TODO
    setTargetImageType(ImageType.Item);
    transitNextState(CreateState.Image, targetId); // 対象ID情報を保持するために、IDを明示的に指定
  };

  const onPressImageFromStorage = async () => {
    const selectedUri = await pickSingleImageFromLocalStorage();

    if (!selectedUri || !targetId) return;

    const item: Item = items.get(targetId) as Item;
    item.uri = selectedUri;
    items.set(targetId, item);

    setItems(items);
    setTargetImageURL(selectedUri);
    setIsSelectedImage(true);

    closeModal();
  };

  const onItemNameTextChange = (name: string) => {
    const item = items.get(targetId || '');
    if (item === undefined) {
      return;
    }

    item.name = name;
    items.set(targetId || '', item);
    setItems(items);
  };

  const onItemDescriptionTextChange = (description: string) => {
    const item = items.get(targetId || '');
    if (item === undefined) {
      return;
    }

    item.description = description;
    items.set(targetId || '', item);
    setItems(items);
  };

  const handleRadioButtonPress = (value: ItemCategory) => {
    const item = items.get(targetId || '');
    if (item === undefined) {
      return;
    }

    switch (value) {
      case 'item':
        item.category = 'item';
        break;
      case 'info':
        item.category = 'info';
        break;
      default:
        break;
    }

    items.set(targetId || '', item);
    setItemType(value);
    setItems(items);
  };

  const next = () => {
    setPhase(prev => prev + 1);
    setCreateState(CreateState.Image);
  };

  useEffect(() => {
    // 新規作成時
    if (targetId === '') {
      const newItemId = uuid.v4().toString();

      items.set(newItemId, {
        name: '新規作成',
        mapId: '',
        uri: '',
        itemId: newItemId,
        category: '',
        description: '',
        coordinate: {
          x: -1,
          y: -1,
        },
      });

      setTargetId(newItemId);
      setItems(items);

      return;
    }

    const target = items.get(targetId || '');
    if (target === undefined) {
      return;
    }

    // ラジオボタンの初期値を設定するために必要
    setItemType(target.category);

    setTargetImageURL(target.uri);
    setIsSelectedImage(true);
    
    // TODO: 画像が表示されるまで間隔があるので、それまで画像ピッカーが表示されないようにする
  }, []);

  return (
    <ItemInfoPresenter
      showModal={showModal}
      openModal={openModal}
      closeModal={closeModal}
      next={next}
      targetId={targetId}
      onItemNameTextChange={onItemNameTextChange}
      onItemDescriptionTextChange={onItemDescriptionTextChange}
      handleRadioButtonPress={handleRadioButtonPress}
      itemType={itemType}
      onPressImageWithAI={onPressImageWithAI}
      onPressImageFromStorage={onPressImageFromStorage}
      isSelectedImage={isSelectedImage}
      targetItem={items.get(targetId || '')}
    />
  );
};

export default ItemInfo;
