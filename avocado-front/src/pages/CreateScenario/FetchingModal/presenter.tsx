import React from 'react';
import {Props as ContainerProps} from './index';
import styles from './style';
import Spinner from 'react-native-loading-spinner-overlay';
import {useCreateScenario} from '../createScenario';

type Props = {} & ContainerProps;

const FetchingModalPresenter = ({textContent}: Props) => {
  const {isFetching} = useCreateScenario();

  return (
    <Spinner
      visible={isFetching}
      textContent={textContent}
      textStyle={styles.text}
      overlayColor="rgba(0, 0, 0, 0.6)"
    />
  );
};

export default FetchingModalPresenter;
