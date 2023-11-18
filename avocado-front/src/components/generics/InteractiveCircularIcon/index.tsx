import React, {useEffect} from 'react';
import InteractiveCircularIconPresenter from './presenter';
import {createScenarioFirestore} from '../../../api/firebase/firestore';

type Props = {
  name: string;
  id: string;
  style?: any;
  isCirculated: boolean;
};

const InteractiveCircularIcon = ({name, id, style, isCirculated}: Props) => {
  const [icon, setIcon] = React.useState<string>('');
  const [isFetched, setIsFetched] = React.useState(false)

  useEffect(() => {
    const getUrl = async () => {
      setIcon(await createScenarioFirestore().getUserIconUrl(id));
      setIsFetched(true)
    };
    getUrl();
  }, []);

  return (
    <>
      <InteractiveCircularIconPresenter
        url={icon}
        name={name}
        style={style}
        isCirculated={isCirculated}
        isFetched={isFetched}
      />
    </>
  );
};

export default InteractiveCircularIcon;
