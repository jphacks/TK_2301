import React, {useEffect} from 'react';
import GameHaderPresenter from './presenter';
import {useSocket} from '../../../context/socket.context';
import {Phase} from '../../../models/scenario';
import {useGame} from '../game.context';

export type Props = {
  props: {
    phase: Phase;
    navigation: any;
  };
};

const GameHeader = ({props}: Props) => {
  const {socketRef} = useSocket();

  const onClick = () => {
    socketRef.current?.send(`/ack`);
  };
  return <GameHaderPresenter props={props} onClick={onClick} />;
};

export default GameHeader;
