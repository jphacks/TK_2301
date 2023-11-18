import React, {useEffect, useState} from 'react';
import PurposePresenter from './presenter';
import {Character} from '../../../../models/scenario';
import {useGame} from '../../game.context';

export type Props = {
  characters: Character[];
};

const Purpose = ({characters}: Props) => {
  const {myCharacter} = useGame();
  const [purpose, setPurpose] = useState<string>('');

  useEffect(() => {
    if (myCharacter) {
      const character = characters.filter(
        character => character.name === myCharacter.characterName,
      )[0];
      setPurpose(character.purpose);
    }
  }, []);
  return <PurposePresenter purpose={purpose} />;
};

export default Purpose;
