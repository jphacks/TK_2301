import React, {useEffect} from 'react';
import CharacterSheetPresenter from './presenter';
import {CreateState, useCreateScenario, CharacterType} from '../createScenario';
import uuid from 'react-native-uuid';
import {ImageType} from '../../../models/scenario';
import {pickSingleImageFromLocalStorage} from '../utility';
import {createScenarioFirestore} from '../../../api/firebase/firestore';

const CharacterSheet = () => {
  const {
    setEditingCharacter,
    setPhase,
    transitNextState,
    targetId,
    setTargetId,
    nowCharacterType,
    otherCharacters,
    editingCharacter,
    setTargetImageURL,
    setTargetImageType,
    criminal,
    setOtherCharacters,
  } = useCreateScenario();

  const [showImageSelectModal, setShowImageSelectModal] = React.useState(false);

  const closeImageSelectModal = () => setShowImageSelectModal(false);
  const openImageSelectModal = () => setShowImageSelectModal(true);

  useEffect(() => {
    if (targetId === '') {
      const newId = uuid.v4().toString();
      setTargetId(newId);
      
      switch (nowCharacterType) {
        case CharacterType.Criminal:
          setEditingCharacter({
            id: newId,
            name: '',
            age: 0,
            icon: '',
            profession: '',
            public_info: '',
            private_info: '',
            purpose: '',
            type: CharacterType.Criminal,
            timeline: [
              {
                num: 0,
                text: '',
              },
            ],
          });
          break;
        case CharacterType.Other:
          const newCharacter = {
            id: newId,
            name: '',
            age: 0,
            icon: '',
            profession: '',
            public_info: '',
            private_info: '',
            purpose: '',
            type: CharacterType.Other,
            timeline: [
              {
                num: 0,
                text: '',
              },
            ],
          };
          setEditingCharacter(newCharacter);
          otherCharacters.set(newId, newCharacter);
          setOtherCharacters(otherCharacters);
          break;
      }
      return;
    }

    if (nowCharacterType === CharacterType.Other) {
      const other = otherCharacters.get(targetId!)
      setEditingCharacter(other);
    }

    if (
      nowCharacterType === CharacterType.Criminal &&
      editingCharacter === undefined
    ) {
      setEditingCharacter(criminal);
    }

    if (
      editingCharacter?.icon &&
      (editingCharacter.icon.startsWith('character_icons/') ||
        editingCharacter.icon.startsWith('images/'))
    ) {
      // 既にFireStorageに保存されている場合
      const get = async () => {
        const uri = await createScenarioFirestore().getImageUrl(
          editingCharacter.icon!,
        );
        setTargetImageURL(uri);
      };

      get();
    } else {
      setTargetImageURL(editingCharacter?.icon!);
    }

    setTargetImageURL(editingCharacter?.icon || '');
  }, []);

  const onPress = (type: string) => {
    if (type === 'ai') {
      transitNextState(CreateState.World, targetId);
      setPhase(prev => prev + 1);
    }
  };

  const onPressImageWithAI = async () => {
    // TODO
    setTargetImageType(ImageType.Character);
    transitNextState(CreateState.Image, targetId); // 対象ID情報を保持するために、IDを明示的に指定
  };

  const onPressImageFromStorage = async () => {
    const selectedUri = await pickSingleImageFromLocalStorage();

    if (!editingCharacter || !selectedUri || !targetId) return;

    editingCharacter.icon = selectedUri;
    setEditingCharacter(editingCharacter);
    setTargetImageURL(selectedUri);

    closeImageSelectModal();
  };

  return (
    <CharacterSheetPresenter
      openImageSelectModal={openImageSelectModal}
      showImageSelectModal={showImageSelectModal}
      onPressImageFromStorage={onPressImageFromStorage}
      onPressImageWithAI={onPressImageWithAI}
      onPress={onPress}
    />
  );
};

export default CharacterSheet;
