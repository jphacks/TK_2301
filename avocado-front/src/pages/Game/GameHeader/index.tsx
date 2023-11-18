import React, {useEffect} from 'react';
import GameHaderPresenter from './presenter';
import {useSocket} from '../../../context/socket.context';
import {Phase} from '../../../models/scenario';
import {useGame} from '../game.context';
import {useUser} from '../../../context/user.context';

export type Props = {
  props: {
    phase: Phase;
    navigation: any;
  };
};

const GameHeader = ({props}: Props) => {
  const {socketRef} = useSocket();
  const {votedCharacterName, setIsLoading} = useGame();
  const {user} = useUser();

  const onClick = () => {
    if (props.phase.name === '投票') {
      socketRef.current?.send(`/vote ${votedCharacterName} ${user?.uid}`);
    } else {
      socketRef.current?.send(`/ack`);
      setIsLoading(true);
    }
  };
  return <GameHaderPresenter props={props} onClick={onClick} />;
};

export default GameHeader;
