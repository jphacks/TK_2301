import React, {useEffect, useState} from 'react';
import CharacterListPresenter from './presenter';
import {useGame} from '../../../game.context';
import {useUser} from '../../../../../context/user.context';
import {Character} from '../../../../../models/scenario';
import {useSocket} from '../../../../../context/socket.context';

export type Props = {
  scenarioCharacters: Character[];
};

const CharacterList = ({scenarioCharacters}: Props) => {
  const {
    usersOnTheFloor,
    nowMapId,
    selectedCharacters,
    setIsShowSelectTransferredCharacters,
    transferableItem,
    setMyItems,
  } = useGame();
  const {user} = useUser();
  const {socketRef} = useSocket();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isSelected, setIsSelected] = useState<boolean[]>([]);
  const [targetUserid, setTargetUserid] = useState<string>('');

  useEffect(() => {
    const users = usersOnTheFloor.get(nowMapId)?.filter(u => u !== user?.uid);
    console.log(usersOnTheFloor);
    selectedCharacters?.map(selectedCharacter => {
      if (users?.includes(selectedCharacter.uid!)) {
        const character = scenarioCharacters.find(
          c => c.name === selectedCharacter.characterName,
        );
        if (character) {
          setCharacters(prev => [...prev, character]);
          setIsSelected(prev => [...prev, false]);
        }
        setTargetUserid(selectedCharacter.uid!);
      }
    });
  }, []);

  const onPress = (index: number) => {
    const newIsSelected = isSelected.slice();
    newIsSelected.map((_, i) => {
      if (i !== index) {
        newIsSelected[i] = false;
      } else {
        newIsSelected[i] = true;
      }
    });
    setIsSelected(newIsSelected);
  };

  const cancel = () => {
    setIsShowSelectTransferredCharacters(false);
  };

  const transfer = () => {
    console.log('transfer');
    socketRef.current?.send(
      `/hand ${transferableItem?.itemId} ${targetUserid}`,
    );
    setMyItems(prev => prev.filter(item => item !== transferableItem?.itemId));
    setIsShowSelectTransferredCharacters(false);
  };

  return (
    <CharacterListPresenter
      characters={characters}
      isSelected={isSelected}
      onPress={onPress}
      cancel={cancel}
      transfer={transfer}
    />
  );
};

export default CharacterList;
