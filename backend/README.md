### デバッグ実行手順
#### 0. 接続設定
examples/cli.rs の対象アドレスを設定する

#### 1. サーバを起動させる
```
cargo run
```

#### 2. クライアントを起動
別ターミナルウィンドウを用意し、

```
cargo run --example cli
```
- Successfully connected と表示された段階で、無限ループの標準入力待機状態になる
- 各クライアントには、ランダムに生成した32文字のIDと、5文字のnameが付与される


### 対応済コマンド

#### 部屋作成
```
/create
```
- 送信者がオーナーとなるルームを作成する
- 新しい部屋IDが返ってくる

#### 入室
```
/join_room <room_id>
```
- 部屋にはいる

#### ACK
```
/ack
```
- 進行の可否を承認する
- ブロードキャストで以下のデータが返される

```
"/res_ack cOIxxPe5EvctIbY3hkUiEFI406ELAWq9"
```

#### ACKキャンセル
```
/rm_ack
```
- 進行の可否の承認をキャンセルする
- `ack_cancel` にしようかと思ったけど、タイポを防ぐために短くした
- ブロードキャストで以下のデータが返される

```
"/res_rm_ack cOIxxPe5EvctIbY3hkUiEFI406ELAWq9"
```


#### シナリオ選択
```
/sce <scenario_id>
```
- ブロードキャストで以下のデータが返される

```
"/res_sce {\"scenario_id\":\"656e7472-795f-5f5f-5f5f-5f5f5f5f5f5f\",\"proposer\":{\"user_id\":\"JxonjEGjuUkkjbz5G62GZ8uq1c4a3b1C\",\"user_name\":\"O9QUH\"}}"
```

#### シナリオ選択入出
```
/join_sce <scenario_id>
```

- ブロードキャストで以下のデータが返される

```
"/res_join_sce {\"scenario_id\":\"656e7472-795f-5f5f-5f5f-5f5f5f5f5f5f\",\"participant\":{\"user_id\":\"O72DCIxYwjSuX2n6qfSe4HFVwiIrQWDs\",\"user_name\":\"5FaUb\"}}"
```

#### 部屋のプレイヤー人数指定
```
/set_num <player_num>
```
- プレイヤー人数を指定する
- ACKのスタックのキャパシティは、この値になる

#### アイテムの受け渡し
```
/hand <item_id> <対象のuser_id>
```
対象に以下のメッセージがユニキャストで送信される
```
/hand_recv <item_id> <送信者のuser_id>
```

### デバッグ用コマンド
おそらくデバッグ時にしか使わないコマンド

#### 部屋一覧
```
/list
```
- 現在ある部屋とその作成者、部屋にいるユーザの一覧を送信
- 以下のフォーマットになる
```
received: Text("865afdd4-855a-4360-81b5-5bf39dbe7b19 by l3jr3")
received: Text("1: rYt647VckVrDHMqbRFX5ypYzaTmt91Xd, l3jr3")
received: Text("656e7472-795f-5f5f-5f5f-5f5f5f5f5f5f by admin")
received: Text("1: jm6hQVho9AHHZgjj6J2KTDFEsVrew4Or, Aq61e")
received: Text("2: WSx3uSs8eCEoJ1DzyvFRwn03wpDTDKKV, N6yeI")
```
上記の場合、サーバには
- l3jr3がつくった部屋, 865afdd4-855a-4360-81b5-5bf39dbe7b19
- adminが作った部屋, 656e7472-795f-5f5f-5f5f-5f5f5f5f5f5f

が存在し、各部屋にはそれぞれ`l3jr3`, `Aq61e`と`N6yeI`がいることを示す。

#### ユーザ情報閲覧
```
/me
```
- コマンド送信者のid, name, 今いる部屋のidを表示する

### ログ見方
サーバサイドのログ出力は、基本的に以下のフォーマットに従う

```
[テキストメッセージの種類] <送信したクライアントの名前>: <補足情報>
```

通常のテキストメッセージを受信した場合、
```
[MESSAGE] john: <テキスト内容>
```

ACKコマンドを受信した場合、
```
[ACK] john: <ACK受信に成功したかどうかのメッセージ文>
```

というように表示される。
