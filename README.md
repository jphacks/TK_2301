# 密話廊
![Slide 16_9 - 1](https://github.com/jphacks/TK_2301/assets/81950820/ada805ca-cd58-4ff6-ac29-87814d9b8ad2)

## 発表資料・DEMO動画
紹介スライド: https://docs.google.com/presentation/d/1tCoYFBcrf41JzTUOwREaWhuh8eCS6cRs/edit#slide=id.p1
https://drive.google.com/drive/folders/1AxAQkUPbmNPqh5k57mtvJrdPFYpYXSQ1

## 製品概要
### 背景(製品開発のきっかけ、課題等）
マーダーミステリーとは、中国で人気の小説のような謎解きゲームであるが、小説一つあたり1000円もする。
そこで、AIによって作るハードを下げ、もっと遊びやすい環境をつくるため、本プロダクトを開発した

### 製品説明（具体的な製品の説明）
マーダーミステリーを作って投稿, そして遊ぶプラットフォームです。
初めての方でもマダミスを作ることができるようにAIがサポートいたします。
具体的にはシナリオ生成に必要なトリックやアイテムの提案や、
背景等のイラストを生成する機能も提供する点が特徴になっております。

### 特長
#### 1. 特長1 AIによるシナリオ/画像生成
以下のOpenAIの2種類のAPIを用いて、ユーザーのシナリオ制作をお手伝いします。
1. GPTによるその世界観で使えそうなトリック集の提案
2. DALL·E 2によるアイテムや背景に使えるイラスト自動生成

#### 2. 特長2 スリリングな推理体験
- 推理中のアイテム譲渡や密談部屋は勿論のこと、リアルタイムで密談部屋を行き来できるようにすることで、予測不可能な推理体験を提供します。

#### 3. 特長3 フレンドと遊びやすい仕組み作り
- シナリオ選択からフレンドと会話しながら行えることで、皆でワイワイしながらゲームできます。

### 解決出来ること
- 普通にプレイすると、ひとつ1000円以上する物語を自分の手でAIを用いて簡単に生成できること

### 今後の展望
- 作成したシナリオを遊べるようにする
- ゲームの詳細部分の実装
- DB設計
- テスト駆動実装

### 注力したこと（こだわり等）
- OpenAIのAPIを用いたシナリオ・画像生成
- 生成サーバとクライアントの連携

## 開発技術
### 技術構成図
![image](https://github.com/jphacks/TK_2301/assets/81950820/02850cca-a256-4815-bea0-d70ef9b4db31)

#### API・データ
- OpenAPI
    - chatGPT4
    - DALL・E 2
- Firebase
    - Authentication
    - Firestore Database
    - Storage

#### フレームワーク・ライブラリ・モジュール
- フロント: ReactNative, TypeScript
- バック: Actix Web, Rust
- AI生成サーバ: Lambda, Python

### デザインツール
- Figma

#### デバイス
* iOS, Android対応

### 独自技術
#### ハッカソンで開発した独自機能・技術
##### 特に見て欲しいディレクトリ
- https://github.com/jphacks/TK_2301/tree/master/ai_generator
##### 特に見て欲しいcommit
- `44a3fe0c03812491e954beecbe28b75453d976c4`
	- feat: OpenAIのAPIによるプロントを用いたシナリオ生成・画像生成機能の実装
- `4a197d6e58ef89f7e002417946450a7a84acf5af`
	- fix: シナリオ作成
- `870880737bdd663aed383578461273d00d52d1bd`
  - feat: シナリオ生成画面
