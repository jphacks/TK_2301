import React from 'react';
import ScenarioItemPresenter from './presenter';

type Props = {
  thumbnail: any;
  title: string;
  rating: number;
  numberOfPlayers: number;
  timeRequired: number;
  navigation: any;
};

const ScenarioItem = ({
  thumbnail,
  title,
  rating,
  numberOfPlayers,
  timeRequired,
  navigation,
}: Props) => {
  function decimalToHoursAndMinutes(decimalTime: number): string {
    const hours = Math.floor(decimalTime);
    const minutes = Math.round((decimalTime - hours) * 60);

    if (minutes === 0) {
      return `${hours}時間`;
    } else {
      return `${hours}時間${minutes}分`;
    }
  }

  const formattedTimeLimit = decimalToHoursAndMinutes(timeRequired);

  const onClick = () => {
    navigation.navigate('ScenarioDetailsPage', {
      thumbnail,
      title,
      rating,
      numberOfPlayers,
      timeRequired: formattedTimeLimit,
    });
  };

  return (
    <ScenarioItemPresenter
      thumbnail={thumbnail}
      title={title}
      rating={rating}
      numberOfPeople={numberOfPlayers}
      timeLimit={formattedTimeLimit}
      onClick={onClick}
    />
  );
};

export default ScenarioItem;
