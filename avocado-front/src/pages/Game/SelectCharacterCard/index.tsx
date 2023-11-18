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
  const [isSelect, setIsSelect] = useState<boolean>(false);

  const onPress = (characterName: string) => {
    if (isSelect) return;
    if (myCharacter) return; // 理想はキャラクター変更できるようにしたいけど一旦
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
        setIsSelect(true);
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
