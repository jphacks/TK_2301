import React, {useEffect, useState} from 'react';
import SelectCharacterCardPresenter from './presenter';
import {useSocket} from '../../../context/socket.context';
import {useGame} from '../game.context';
import {useUser} from '../../../context/user.context';
import {Character} from '../../../models/scenario';

export type Props = {
  character: Character;
};

const SelectCharacterCard = ({character}: Props) => {
  const {socketRef} = useSocket();
  const {myCharacter, setMyCharacter, selectedCharacters} = useGame();
  const {user} = useUser();

  const [selectedUserId, setSelectedUserId] = useState<string>();

  const onPress = (characterName: string) => {
    selectedCharacters?.map(selectedCharacter => {
      if (selectedCharacter.characterName === characterName) {
        return;
      }
    });
    socketRef.current?.send(`/select ${characterName}`);
    const uid = user?.uid ?? null;
    setMyCharacter({
      characterName,
      uid,
    });
    setSelectedUserId(user?.uid ?? undefined);
  };

  useEffect(() => {
    selectedCharacters?.map(selectedCharacter => {
      if (selectedCharacter.characterName === character.name) {
        setSelectedUserId(selectedCharacter.uid ?? undefined);
      }
    });
  }, [selectedCharacters]);
  return (
    <SelectCharacterCardPresenter
      character={character}
      onPress={onPress}
      selectedUserId={selectedUserId}
    />
  );
};

export default SelectCharacterCard;
