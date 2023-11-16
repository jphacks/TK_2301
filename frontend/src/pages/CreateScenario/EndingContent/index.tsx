import React, { useEffect } from 'react';
import EndingContentPresenter from './presenter';
import { CharacterType, useCreateScenario } from '../createScenario';

const EndingContent = () => {
  const {targetId, nowCharacterType, otherCharacters, editingCharacter, setEditingCharacter} = useCreateScenario();

  useEffect(() => {
    otherCharacters.get(targetId || '') 
  })

  return <EndingContentPresenter targetCharacter={{
    id: '',
    name: '',
    age: 0,
    icon: '',
    profession: '',
    public_info: '',
    private_info: '',
    purpose: '',
    type: "/Users/rsk-ymst/_repo/TK_2301/frontend/src/models/scenario".Default,
    timeline: []
  }} />;
};

export default EndingContent;
