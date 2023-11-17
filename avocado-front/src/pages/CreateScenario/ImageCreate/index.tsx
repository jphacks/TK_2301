import React, {useState} from 'react';
import ImageCreatePresenter from './presenter';
import {useCreateScenario} from '../createScenario';
import {getStorage, ref, getDownloadURL} from 'firebase/storage';
import {createScenarioFirestore} from '../../../api/firebase/firestore';
import {ImageType} from '../../../models/scenario';

const ImageCreate = () => {
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState<string>('');

  const [candidateImageUri, setCandidateImageUri] = useState<string[]>([
    'images/20231029T104520_medieval_knife_image0.png',
    'images/20231029T104520_medieval_knife_image1.png',
    'images/20231029T104520_medieval_knife_image2.png',
    'images/20231029T104520_medieval_knife_image3.png',
  ]);
  const [focusedImageUri, setFocusedImageUri] = useState<string>(''); //
  const [showItemModal, setShowItemModal] = useState(false);

  const [fetchedImage, setFetchedImage] = useState(false);

  const {
    setTargetImageURL,
    transitPrevState,
    targetImageURL,
    targetId,
    targetImageType,
    setItems,
    items,
    floorMaps,
    setFloorMaps,
    setItemImageCandidate,
    editingCharacter,
    setEditingCharacter,
    isFetching,
    setIsFetching,
  } = useCreateScenario();

  const onChangeText = (text: string) => {
    setInputText(text);
  };

  const onPressDecideImage = async () => {
    setTargetImageURL(focusedImageUri);
    console.log(focusedImageUri);

    const storage = getStorage();
    const storageReference = ref(storage, focusedImageUri);
    const path = storageReference.fullPath;
    const buf = path.split('/');

    const uriForStore = `${buf[buf.length - 2]}/${buf[buf.length - 1]}`;
    console.log(uriForStore);
    console.log(targetImageType);
    console.log(targetId);

    switch (targetImageType) {
      case ImageType.Character:
        if (editingCharacter === undefined) return;
        editingCharacter.icon = uriForStore;
        setTargetImageURL(uriForStore);
        setEditingCharacter(editingCharacter);
        break;
      case ImageType.FloorMap: {
        const target = floorMaps.get(targetId || '');
        if (target === undefined) return;

        target.uri = uriForStore;
        floorMaps.set(targetId || '', target);

        setFloorMaps(floorMaps);
        break;
      }
      case ImageType.Item: {
        const target = items.get(targetId || '');
        if (target === undefined) return;

        target.uri = uriForStore;
        items.set(targetId || '', target);

        setItems(items);
        break;
      }
      default:
        break;
    }

    console.log(targetImageURL);
    transitPrevState();
  };

  const onPress = async () => {
    // 準備中
    // const data = {
    //   item: inputText,
    // };
    // const formResponse = await fetch(
    //   'https://xjco3magcfqmxua5siozh5a3qy0msxlr.lambda-url.ap-northeast-1.on.aws/',
    //   {
    //     method: 'POST', // HTTP-Methodを指定する！
    //     body: JSON.stringify(data), // リクエストボディーにフォームデータを設定 中世風のナイフ
    //   },
    // );

    // const candidateImageUri = await formResponse.json();

    if (candidateImageUri === undefined) return;

    setIsFetching(true);
    const imageURLBuf = [];

    for (const refUri of candidateImageUri) {
      console.log(refUri);
      const url = await createScenarioFirestore().getImageUrl(refUri);
      imageURLBuf.push(url);
    }

    console.log(imageURLBuf);

    setCandidateImageUri(imageURLBuf);
    setFetchedImage(true);
    setShowItemModal(true);
    setIsFetching(false);
  };

  return (
    <ImageCreatePresenter
      onChangeText={onChangeText}
      onPress={onPress}
      image={image}
      showItemModal={showItemModal}
      fetchedImage={fetchedImage}
      itemImageCandidate={undefined}
      candidateImageUri={candidateImageUri}
      focusedImageUri={focusedImageUri}
      setFocusedImageUri={setFocusedImageUri}
      onPressDecideImage={onPressDecideImage}
    />
  );
};

export default ImageCreate;
