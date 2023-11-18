import React, {FC, useEffect, useState} from 'react';
import ScenarioDetailsPresenter from './presenter';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootRoutesParamList} from '../../routes/Root';
import {useSocket} from '../../context/socket.context';

type Props = NativeStackScreenProps<RootRoutesParamList, 'ScenarioDetailsPage'>;
const ScenarioDetails: FC<Props> = ({navigation, route}) => {
  const [isCapacity, setIsCapacity] = useState(true);

  const nowPlay = () => {
    //socketRef.current?.send(`/sce suLlIwGrJLQgP3A0U0WP`)
    navigation.navigate('GamePage', {scenario: route.params.scenario});
  };

  // 実際はここでサーバーからauthorやauthorIconなど必要情報を取得する
  const author = 'ぼぐちゃ';
  const authorIcon = require('./testIcon.png');
  const outline =
    'あなたの目の前には、先ほどから暗闇が広がっている。\n手足は何か器具のようなもので拘束されているようだ。\n\n暗がりの中ではあるが、その息遣いから、\n他にもこの空間に誰かがいることがわかる。\n\nどうやら、何かミスをして捕まったのだろう。\n警察に捕まったのか、恨みを買って私刑にかけられようとしているのか、どちらにしても、絶体絶命の状態だ。\n\n「お前たちには、ある「ゲーム」をしてもらう。」\n\nスピーカーから、アナウンスが流れる。\n\n\n全く聞いたことのない声だったが、\n声の主がこの場を支配していることはわかる。\n「ゲーム」とはロクでもないものに違いない。\n\nだが、退屈しのぎには、ちょうどいいだろう。\n「殺し」の技術に関しては自分が一番優れているのだから。\n\nしかし、油断は大敵だ。いつもそれを実感させられている。それぞれの思惑をもとに、孤高の殺し屋たちによる\n「ゲーム」が始まる。';
  const characters = [
    {
      icon: require('./testIcon.png'),
      nameKanji: '竹下波瑠',
      nameKana: 'たけしたはる',
      age: 52,
      profession: 'マジシャン',
      description:
        '背が低く、見た目は優しげな初老の男性の殺し屋。いつも右手で杖をついて歩いている。その界隈では有名な、いわゆる技術志向のマジシャン。10年ほどのブランクの後、2年ほど前に現場に復帰した。つけられた名前は、「奇跡の右腕」。',
    },
    {
      icon: require('./testIcon.png'),
      nameKanji: '宝ヶ池奈津',
      nameKana: 'たからがいけなつ',
      age: 26,
      profession: '劇団女優',
      description:
        '美しく若い女性の殺し屋。普段は小さな劇団の女優をしている。殺し屋の中では有名な、特殊な才能を持って生まれるとされる「宝ヶ池家」の血筋である。非常にわがままな性格であり、周囲のあらゆる面倒事を嫌う。',
    },
    {
      icon: require('./testIcon.png'),
      nameKanji: '貴船歩由',
      nameKana: 'きぶねふゆ',
      age: 35,
      profession: 'アパレル店員',
      description:
        '高身長で、細身の紳士風の男性の殺し屋。普段は、世界的な高級アパレルショップの店員をしている。日本では珍しい隔絶された村の出身である。身だしなみが整っており、清潔感もある。',
    },
  ];
  const scenarioFlow = [
    'シナリオの読み込み（30分〜40分',
    '全体導入（5分）',
    '自己紹介（5分）',
    '議論：第一段階 証拠品の配布（20分）',
    '議論：第二段階 捜査資料の配布（20分）',
    '議論：第三段階 秘密の公開（30分）',
    '推理（5分✖3）',
    '投票',
    'エンディング・解説（15分）',
    'エピローグ（15分）',
  ];

  const impressions = [
    {
      icon: 'https://firebasestorage.googleapis.com/v0/b/avocado-test-5e236.appspot.com/o/character_icons%2Fa.png?alt=media&token=281ceb12-1f18-4be7-a354-b8df20419a80',
      name: 'ぽむぽむ',
      comment: 'ハラハラドキドキな物語でした',
    },
    {
      icon: 'https://firebasestorage.googleapis.com/v0/b/avocado-test-5e236.appspot.com/o/character_icons%2Fd.png?alt=media&token=f8408269-bcee-4e1f-816f-3d4cea1efd69',
      name: 'うさぎさん',
      comment: 'とても楽しかった！！！',
    },
    {
      icon: 'https://firebasestorage.googleapis.com/v0/b/avocado-test-5e236.appspot.com/o/character_icons%2Fc.png?alt=media&token=784fd5d7-b986-430e-9bc6-390f87513126',
      name: 'やまたろ',
      comment: '記憶を消してもう一回やりたいな！',
    },
  ];

  // route.paramsとauthorとauthorIconを結合してpropsに渡す
  const props = {
    ...route.params,
    author,
    authorIcon,
    outline,
    scenarioFlow,
    impressions,
    isCapacity,
    setIsCapacity,
    navigation,
    nowPlay,
  };
  return <ScenarioDetailsPresenter {...props} />;
};

export default ScenarioDetails;
