import React, {useState} from 'react';
import ImageCreatePresenter from './presenter';
import {storage} from 'react-native-firebase';

const ImageCreate = () => {
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState<string>('');
  const onChangeText = (text: string) => {
    setInputText(text);
  };

  const onPress = async () => {
    const data = {
      item: inputText,
    };
    const formResponse = await fetch(
      'https://xjco3magcfqmxua5siozh5a3qy0msxlr.lambda-url.ap-northeast-1.on.aws/',
      {
        method: 'POST', // HTTP-Methodを指定する！
        body: JSON.stringify(data), // リクエストボディーにフォームデータを設定 中世風のナイフ
      },
    );

    const resData: {url: string} = await formResponse.json();
    console.log(resData.url);

    const getUrl = async () => {
      await storage()
        .ref(`${resData.url}.png`)
        .getDownloadURL()
        .then(url => {
          setImage(url);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getUrl();
  };
  return (
    <ImageCreatePresenter
      onChangeText={onChangeText}
      onPress={onPress}
      image={image}
    />
  );
};

export default ImageCreate;
