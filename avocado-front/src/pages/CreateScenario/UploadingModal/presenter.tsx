import React from 'react';
import {Props as ContainerProps} from './index';
import styles from './style';
import Spinner from 'react-native-loading-spinner-overlay';
import {useCreateScenario} from '../createScenario';

type Props = {
} & ContainerProps;

const UploadingModalPresenter = ({textContent}: Props) => {
  const {isUploading} = useCreateScenario();

  return (
      <Spinner
        visible={isUploading}
        textContent={textContent}
        textStyle={styles.text}
      />
  );
};

export default UploadingModalPresenter;
