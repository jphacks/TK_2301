import React, {useEffect} from 'react';
import InteractiveCircularIconPresenter from './presenter';
import {createScenarioFirestore} from '../../../api/firebase/firestore';

type Props = {
  name: string;
  id: string;
};

const InteractiveCircularIcon = ({name, id}: Props) => {
  const [icon, setIcon] = React.useState<string>('');

  useEffect(() => {
    const getUrl = async () => {
      setIcon(await createScenarioFirestore().getUserIconUrl(id));
    };
    getUrl();
  }, []);

  return (
    <>
      <InteractiveCircularIconPresenter url={icon} name={name} />
    </>
  );
};

export default InteractiveCircularIcon;
