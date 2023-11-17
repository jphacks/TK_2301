import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {useCreateScenario} from '../createScenario';
import CharacterVoteButton from '../../../components/generics/CharacterVoteButton';
import styles from './style';
import {Character, Serif} from '../../../models/scenario';
import CircularIcon from '../../../components/generics/CircularIcon';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  targetCharacter: Character;
};

const EndingContentPresenter = () => {
  const {
    otherCharacters,
    criminal,
    editingCharacter,
    targetId,
    endings,
    setEndings,
  } = useCreateScenario();
  const characters = [...Array.from(otherCharacters.values()), criminal];
  const [targetStorySerifLine, setTargetStorySerifLine] = React.useState<
    Serif[]
  >(endings.get(targetId || '')?.storySerifLine || []);
  const [focusedSerifIndex, setFocusedSerifIndex] = useState(-1);

  useEffect(() => {
    console.log('targetId:', targetId);
    console.log('endings:', endings);
    console.log('targetStorySerifLine:', targetStorySerifLine);
  }, []);

  const deleteElementWithIndex = (index: number) => {
    const targetEnding = endings.get(targetId || '');
    if (targetEnding === undefined) return;

    console.log('targetEnding:', targetEnding.storySerifLine);
    const bufStorySerifLine = targetEnding.storySerifLine.filter(
      (_, bufIndex) => index !== bufIndex,
    );

    console.log('bufStorySerifLine:', bufStorySerifLine);

    targetEnding.storySerifLine = [...bufStorySerifLine];

    setEndings(prev => {
      prev.set(targetId || '', targetEnding);
      return prev;
    });

    setTargetStorySerifLine([...bufStorySerifLine]);
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <CharacterVoteButton
          character={editingCharacter}
          isNone={targetId === 'none'}
          forPlayingGame={false}
          style={styles.characterVoteButton}
          onPress={() => {}}
        />

        <Text style={styles.text}>この場合のエンディング</Text>
      </View>

      <ScrollView style={styles.serifView}>
        {endings.get(targetId || '')?.storySerifLine.map((line, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setFocusedSerifIndex(index);
              }}
              key={`serif.${index}`}
              style={[
                styles.serifContainer,
                focusedSerifIndex === index && styles.focusedSerifInput,
              ]}>
              <View>
                {line.isStoryTeller ? (
                  <TouchableOpacity>
                    <View
                      style={[
                        styles.serifHeaderContainer,
                        styles.storyTellerText,
                      ]}>
                      <View style={styles.serifHeader}>
                        <Text style={styles.iconText}>語り部</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => deleteElementWithIndex(index)}>
                        <Icon
                          name="closecircleo"
                          color={'white'}
                          size={20}
                          style={{marginRight: 10}}></Icon>
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      style={[styles.storyTellerSerifInput]}
                      placeholderTextColor="#696969"
                      placeholder="テキストを入力してください"
                      defaultValue={targetStorySerifLine[index].textContent}
                      multiline
                      onPressIn={() => {
                        setFocusedSerifIndex(index);
                      }}
                      onChangeText={text => {
                        targetStorySerifLine[index].textContent = text;
                        setTargetStorySerifLine([...targetStorySerifLine]);

                        const targetEnding = endings.get(targetId || '');
                        if (!targetEnding) return;

                        targetEnding.storySerifLine = [...targetStorySerifLine];
                        endings.set(targetId || '', targetEnding);

                        setTargetStorySerifLine([...targetStorySerifLine]);
                        setEndings(endings);
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <View>
                    <View style={styles.serifHeaderContainer}>
                      <View style={styles.serifHeader}>
                        <CircularIcon
                          styles={styles.icon}
                          url={''}></CircularIcon>
                        <Text
                          style={
                            styles.iconText
                          }>{`${line.character.name} (${line.character.age})`}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => deleteElementWithIndex(index)}>
                        <Icon
                          name="closecircleo"
                          color={'white'}
                          size={20}
                          style={{marginRight: 10}}></Icon>
                      </TouchableOpacity>
                    </View>

                    <TextInput
                      style={[styles.serifInput]}
                      placeholderTextColor="#696969"
                      placeholder="テキストを入力してください"
                      defaultValue={targetStorySerifLine[index].textContent}
                      multiline
                      onPressIn={() => {
                        setFocusedSerifIndex(index);
                      }}
                      onChangeText={text => {
                        targetStorySerifLine[index].textContent = text;
                        setTargetStorySerifLine([...targetStorySerifLine]);

                        const targetEnding = endings.get(targetId || '');
                        if (!targetEnding) return;

                        targetEnding.storySerifLine = [...targetStorySerifLine];
                        endings.set(targetId || '', targetEnding);

                        setTargetStorySerifLine([...targetStorySerifLine]);
                        setEndings(endings);
                      }}
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* </View> */}

      <ScrollView horizontal style={styles.tabBar}>
        <View style={styles.tabBarContainer}>
          <TouchableOpacity
            style={styles.characterSelectIcon}
            onPress={() => {
              if (!editingCharacter) return;

              if (!endings.has(targetId || '')) {
                endings.set(targetId || '', {
                  character: editingCharacter,
                  storySerifLine: [],
                  outline: '',
                });
              }

              const newSerif = {
                character: editingCharacter, // 一応置いとく
                isStoryTeller: true,
                textContent: '',
              };

              const targetEnding = endings.get(targetId || '');
              if (targetEnding === undefined) return;

              targetEnding?.storySerifLine.push(newSerif);

              setEndings(prev => {
                prev.set(targetId || '', {
                  character: editingCharacter,
                  storySerifLine: [...targetEnding?.storySerifLine],
                  outline: targetEnding.outline,
                });

                return prev;
              });

              setTargetStorySerifLine([...targetStorySerifLine, newSerif]);
            }}>
            <Text style={styles.iconText}>語り部</Text>
          </TouchableOpacity>
          {characters.map((character, index) => (
            <TouchableOpacity
              style={styles.characterSelectIcon}
              key={`select.${index}`}
              onPress={() => {
                if (!endings.has(targetId || '')) {
                  endings.set(targetId || '', {
                    character,
                    storySerifLine: [],
                    outline: '',
                  });
                }

                const newSerif = {
                  character: character,
                  textContent: '',
                };

                const targetEnding = endings.get(targetId || '');
                if (targetEnding === undefined) return;

                targetEnding?.storySerifLine.push(newSerif);

                setEndings(prev => {
                  prev.set(targetId || '', {
                    character,
                    storySerifLine: [...targetEnding?.storySerifLine],
                    outline: targetEnding.outline,
                  });

                  return prev;
                });

                setTargetStorySerifLine([...targetStorySerifLine, newSerif]);
              }}>
              <CircularIcon
                styles={styles.icon}
                url={character?.icon}></CircularIcon>
              <Text
                style={
                  styles.iconText
                }>{`${character.name} (${character.age})`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default EndingContentPresenter;
