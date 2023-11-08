import React, {useEffect, useState} from 'react';
import GamePresenter from './presenter';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootRoutesParamList} from '../../routes/Root';
import {useTabbar} from '../../context/tabbar.context';
import {GameProvider} from './game.context';

// floorMapからitemsを外に出す。itemにfloorMapのidを持たせる
export type ScenarioType = {
  title: string;
  outline: string;
  numberOfPlayers: number;
  characters: {
    nameKanji: string;
    nameKana: string;
    age: number;
    icon: any;
    profession: string;
    description: string;
    about: string;
    purpose: string;
  }[];
  phase: string[];
  floorMap: {
    floorName: string;
    background: any;
    items: {
      id: number;
      image: any;
      name: string;
      category: string;
      description: string;
    }[];
  }[];
  numberOfSurveys: number;
};

export type CharactersProps = {
  characters: {
    nameKanji: string;
    nameKana: string;
    age: number;
    icon: any;
    profession: string;
    description: string;
    about: string;
    purpose: string;
  }[];
};

export type Props = {
  scenario: ScenarioType;
};

type NavigationProps = NativeStackScreenProps<RootRoutesParamList, 'GamePage'>;
const Game = ({navigation}: NavigationProps) => {
  const {setIsInfoVisible, setIsChatVisible, setIsSettingsVisible} =
    useTabbar();
  const scenario = {
    title: 'マーダーミステリーゲーム',
    outline: '',
    numberOfPlayers: 3,
    characters: [
      {
        nameKanji: '竹下波瑠',
        nameKana: 'たけした はる',
        age: 52,
        icon: require('./icons/icon.png'),
        profession: 'マジシャン',
        description:
          '背が低く、見た目は優しげな初老の男性の殺し屋。いつも右手で杖をついて歩いている。その界隈では有名な、いわゆる技術志向のマジシャン。10年ほどのブランクの後、2年ほど前に現場に復帰した。つけられた名前は、「奇跡の右腕」。',
        about: '',
        purpose: '',
      },
      {
        nameKanji: '宝ヶ池奈津',
        nameKana: 'たからがいけなつ',
        age: 26,
        icon: require('./icons/icon.png'),
        profession: '劇団女優',
        description:
          '美しく若い女性の殺し屋。普段は小さな劇団の女優をしている。殺し屋の中では有名な、特殊な才能を持って生まれるとされる「宝ヶ池家」の血筋である。非常にわがままな性格であり、周囲のあらゆる面倒事を嫌う。',
        about:
          '私が殺しをしてる理由？あれ、あんたには、まだ言ってなかったっけ？\n「宝ヶ池家の子供は「宝」を持って生まれてくる。」そんな言葉が、私たちの家系では、ずっと受け継がれてきた。\n確かに、世界的なピアニスト、オリンピックの日本代表、内閣総理大臣…宝ヶ池家の人間は、生まれつき、多くの「宝」を持っているみたいね。\nでも、宝ヶ池家のことなんて、あんた達、殺し屋ぐらいしか知らないでしょう？「宝ヶ池」という姓は、外の世界に向けたものではないから。\n「宝」を持ってこの屋敷の外に出ていった人間は、「宝ヶ池」の姓を捨て、表向きの人生を歩む。そういう、よく分からない変わった家系に生まれたのよ、私は。\nえ？私は何の「宝」を持って生まれてきたのかって？何もなかった。何もなかったのよ、悪い？いや、あるにはあるか。「宝」というには、程遠いけどさ。\n私は、先天的な「解離性同一障害」を持って生まれてきたの。世間一般でいう、２重人格っていうやつかな。人格が切り替わった時の記憶は、夢みたいな感じでぼんやりと残る。\n人格が切り替わるタイミングは大きく２つ。１つは、私に精神的な負荷がかかっていること。もう１つは、睡眠をとったり、意識を失うこと。\nこの状況が重なった時、私は「もう１人の私」に切り替わる。\n「もう１人の私」が、平和で優しい奴ならよかったんだけど、そんなに、上手くはいかないよね。\n彼女は…いや、彼なのかもしれないけどさ。「もう１人の私」は、いつも何かを壊そうとする、暴力的な人格だったんだ。だから、兄弟は私を家に閉じ込めて拘束してた。\n「こんな子は、外の世界に出せない」って。みんな私を恐れて、猛獣を見るような目で見ていたんだ。唯一優しいのは、私のお母さんだけだったなあ。\nでも、私はずっと諦めなかった。お母さんが読み聞かせてくれた、童話のお姫様みたいな人生に憧れていたんだ。\nだから、最後には、かっこいい王子様が迎えにくるんだって信じてた。\nただ、現実にはカボチャの馬車も、魔法使いもいない。私は、家族に閉じ込められて、そして変わらなかった。\nそして、私の気持ちは、ある時爆発した。私が唯一信じていたお母さんが、私の兄弟に殺されたからだ。私は、「もう１人の私」に身を任せて、兄弟を全員殺害した。\n王子様は、迎えにきてはくれなかった。私は自分の足で、あの家を出て行ったんだ。\nその後、私はたまたま拾われた劇団で、冴えない舞台女優となった。脇役ばかりではあったけど、何かを演じることは、気を紛らすには良かった。\nあー、もしかするとさ。私がもらった「宝」っていうのは、「殺しの才能」だったのかもね。兄弟を殺したあの時から、私は殺人衝動が止められなくなったんだ。\n私が、殺しの標的にしたのは「赤の箒」という新興宗教団体だ。私の兄弟は、全員そこの信者だった。お母さんを殺したのも、教祖の命令によるものだとわかったんだ。\nだから、その教祖の男を暗殺をしようとしたんだ。でも、そんなに上手くいかないよね。側近の人間を何人か殺した後、私は逆に追い詰められた。私の使う毒薬である『眠り姫』も、取り上げられた。周りの人間に薬を注射されて、意識も朦朧とした。流石に、死を覚悟したよね。でも、朦朧とした意識のなかで、私の人格は「もう１人の私」に切り替わった。そして、「もう１人の私」は誰かと格闘した。意識が完全に戻った時には、目の前に全身の骨が折れた教祖の死体があったんだ。その時の記憶は、ほとんど残ってはいない。私の全身の筋肉は痛み、両手は血まみれになっていた。汚く、醜い殺し方だ。\n捜査員はこの犯行を行った人間を、「ヴァイズ」と呼んで捜査しているけど、おそらく、私にたどり着くことはないと思う。\nそういえば、信者の追っ手が来るかと思ったけど、幹部は次々と殺され、繋がりのある政治家も死んでいたみたい。優秀な殺し屋が、残党を駆除しているんだと思う。\nそして、捜査員が私に付けた通り名は「ウィッチ」。私は、お姫様になるはずが、付けられたのは毒林檎を渡す魔女の名前だ。なんか皮肉みたいで、とてもイライラする。\nそんなこんなで、私は目的を失った。新興宗教団体は崩壊し、残党も殺し尽くされちゃったしさ。１人、幹部の残党がいるとは聞いたけど、行方も分からない。\nだから、あなたに会いに来たんだ、ガレッド。もういいでしょう、私の話は、これで終わり！',
        purpose: '',
      },
      {
        nameKanji: '貴船歩由',
        nameKana: 'きぶねふゆ',
        age: 35,
        icon: require('./icons/icon.png'),
        profession: 'アパレル店員',
        description:
          '高身長で、細身の紳士風の男性の殺し屋。普段は、世界的な高級アパレルショップの店員をしている。日本では珍しい隔絶された村の出身である。身だしなみが整っており、清潔感もある。',
        about: '',
        purpose: '',
      },
    ],
    phase: [
      'キャラクター選択',
      'ストーリー読み込み',
      '第一章 事件の始まり',
      '投票',
      'エンディング',
      '振り返り',
    ],
    floorMap: [
      {
        floorName: 'メイド長の部屋',
        background: require('./background.png'),
        items: [
          {
            id: 1,
            image: require('./item.png'),
            name: '血のついたナイフ',
            category: '物品',
            description: '血のついたナイフだ。',
          },
          {
            id: 2,
            image: require('./item.png'),
            name: '血のついたナイフ2',
            category: '物品',
            description: '血のついたナイフだ。',
            background: require('./background.png'),
          },
        ],
      },
      {
        floorName: 'メイド長の部屋',
        background: require('./background.png'),
        items: [
          {
            id: 3,
            image: require('./item.png'),
            name: '血のついたナイフ2',
            category: '物品',
            description: '血のついたナイフだ。',
            background: require('./background.png'),
          },
        ],
      },
      {
        floorName: 'メイド長の部屋',
        background: require('./background.png'),
        items: [
          {
            id: 4,
            image: require('./item.png'),
            name: '血のついたナイフ2',
            category: '物品',
            description: '血のついたナイフだ。',
            background: require('./background.png'),
          },
        ],
      },
      {
        floorName: 'メイド長の部屋',
        background: require('./background.png'),
        items: [
          {
            id: 5,
            image: require('./item.png'),
            name: '血のついたナイフ2',
            category: '物品',
            description: '血のついたナイフだ。',
            background: require('./background.png'),
          },
        ],
      },
      {
        floorName: 'メイド長の部屋',
        background: require('./background.png'),
        items: [
          {
            id: 6,
            image: require('./item.png'),
            name: '血のついたナイフ2',
            category: '物品',
            description: '血のついたナイフだ。',
            background: require('./background.png'),
          },
        ],
      },
    ],
    numberOfSurveys: 2,
  };

  // タブバーの可視、不可視を管理するstate
  const [nowPhase, setNowPhase] = useState(0);

  useEffect(() => {
    if (nowPhase === 1) {
      setIsInfoVisible(true);
    } else if (nowPhase === 2) {
      setIsChatVisible(true);
      setIsSettingsVisible(true);
    }
  }, [nowPhase]);

  const props = {
    scenario,
    nowPhase,
    navigation,
    setNowPhase,
  };
  return <GamePresenter {...props} />;
};

export default Game;
