import React, {useEffect} from 'react';
import UserBarPresenter from './presenter';
import scenarioCollection from '../../../api/firebase/firestore';
import {User} from '../../../type';

export type Props = {
  user: User;
};

const UserBar = ({user}: Props) => {
  const [icon, setIcon] = React.useState<string>('');

  useEffect(() => {
    console.log(
      `gs://avocado-test-5e236.appspot.com/user_icons/${user.user_id}.png`,
    );
    const getUrl = async () => {
      setIcon(await scenarioCollection.getUserIconUrl(user.user_id));
    };
    getUrl();
  }, [user]);

  return <UserBarPresenter icon={icon} name={user.user_name} />;
};

export default UserBar;
