import React, {useEffect, useState} from 'react';
import AboutPresenter from './presenters';
import {useGame} from '../../game.context';
import {Character} from '../../../../models/scenario';

export type Props = {
  characters: Character[];
};

const About = ({characters}: Props) => {
  const {myCharacter} = useGame();
  const [about, setAbout] = useState<string>('');

  useEffect(() => {
    if (myCharacter) {
      const character = characters.filter(
        character => character.name === myCharacter.characterName,
      )[0];
      setAbout(character.private_info);
    }
  }, []);

  return <AboutPresenter about={about} />;
};

export default About;
