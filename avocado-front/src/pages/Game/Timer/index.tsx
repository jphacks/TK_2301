import React, {useEffect, useState} from 'react';
import TimerPresenter from './presenter';
import {useGame} from '../game.context';

type Props = {
  initialTime: number;
};

const Timer = ({initialTime}: Props) => {
  const [time, setTime] = useState(initialTime * 60);
  const {setNowPhase} = useGame();

  useEffect(() => {
    if (time == 0) {
      setNowPhase((prev: number) => prev + 1);
    }
    const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(timer as NodeJS.Timeout);
  }, [time]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return <TimerPresenter time={formatTime(time)} />;
};

export default Timer;
