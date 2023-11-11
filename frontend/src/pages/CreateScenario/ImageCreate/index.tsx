import React, {useState} from 'react';
import ImageCreatePresenter from './presenter';
import {useCreateScenario} from '../createScenario';
import storage from '@react-native-firebase/storage';
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
  const [isFetchingImage, setIsFetchingImage] = useState(false);

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
    setItemImageCandidate
  } = useCreateScenario();

  const onChangeText = (text: string) => {
    setInputText(text);
  };

  const onPressDecideImage = async () => {
    setTargetImageURL(focusedImageUri);
    console.log(focusedImageUri);

    const buf = await storage()
      .refFromURL(focusedImageUri)
      .toString()
      .split('/');

    const uriForStore = `${buf[buf.length-2]}/${buf[buf.length-1]}`;
    console.log(uriForStore);
    console.log(targetImageType);
    console.log(targetId);

    switch (targetImageType) {
      case ImageType.Character:
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

    setIsFetchingImage(true);
    const imageURLBuf = [];

    for (const refUri of candidateImageUri) {
      console.log(refUri);
      const url = await storage().ref(refUri).getDownloadURL();
      imageURLBuf.push(url);
    }

    console.log(imageURLBuf);

    setCandidateImageUri(imageURLBuf);
    setFetchedImage(true);
    setShowItemModal(true);
    setIsFetchingImage(false);
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
      isFetchingImage={isFetchingImage}
      focusedImageUri={focusedImageUri}
      setFocusedImageUri={setFocusedImageUri}
      onPressDecideImage={onPressDecideImage}
    />
  );
};

export default ImageCreate;
