import {
  ImageLibraryOptions,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';

export const extractJson = (text: string): Object | null => {
  // Use RegExp to extract a JSON object from the text
  const jsonMatch = text.match(/{.*?}/s);

  if (jsonMatch) {
    const jsonStr = jsonMatch[0];
    try {
      // Convert the extracted string to a JavaScript object
      const jsonObj = JSON.parse(jsonStr);
      return jsonObj;
    } catch (e) {
      console.log('Invalid JSON format');
      return null;
    }
  } else {
    console.log('No JSON object found');
    return null;
  }
};

export const pickSingleImageFromLocalStorage = async (): Promise<string> => {
  const photo: MediaType = 'photo';
  const options: ImageLibraryOptions = {
    mediaType: photo,
  };

  const result = await launchImageLibrary(options);
  return result.assets?.pop()?.uri || '';
};
