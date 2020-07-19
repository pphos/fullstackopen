# Getting data from server
しばらくの間, 「フロントエンド」, つまりクライアント(ブラウザ)機能にのみ取り組んできました.
このコースのパート3では, 「バックエンド」, つまりサーバー側の機能に取り組みます.
それにもかかわらず, ブラウザで実行されているコードがバックエンドと通信する方法を理解することで,
サーバ側の機能への一歩を踏み出します.

<a href="https://github.com/typicode/json-server">JSON Server</a>というソフトウェア開発時に使うツールを用いて, 自分たちのサーバとして機能させてみましょう.

次の内容で, プロジェクトのルートディレクトリに`db.json`という名前のファイルを作成します.

```js
{
  "notes": [
    {
      "id": 1,
      "content": "HTML is easy",
      "date": "2019-05-30T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2019-05-30T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "date": "2019-05-30T19:20:14.298Z",
      "important": true
    }
  ]
}
```

`npm install -g json-server`というコマンドを使用して, JSONサーバをマシンのグローバルにインストールできます.
グローバルインストールには管理者権限が必要であり, 教員用コンピュータや新入生用のラップトップでは権限不足でインストールできない可能性があります.

`json-server`の利用には, グローバルインストールは必要ありません.
アプリのルートディレクトリから, `npx`コマンドを使用して`json-server`を実行できます.

```js
npx json-server --port 3001 --watch db.json
```

`json-server`はデフォルトで3000番ポートを使用して実行されます.
しかし, `create-react-app`で既に3000番ポートを使用しているので, `json-server`に対して3001番などの代替ポートを定義する必要があります.

ブラウザで http://localhost:3001/notes のアドレスに移動しましょう.
`json-server`が, 以前にファイルに書き込んだノートをJSON形式で表示していることが分かります.

<img src="https://fullstackopen.com/static/37694498d0930f7b32df06ee8de181e6/5a190/14e.png">

ブラウザにJSONデータをフォーマットして出力する機能が備わっていない場合には,
<a href="https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc">JSONView</a>のような適切なプラグインをインストールしてください.

今後は, ノートをサーバに保存することになります.
この場合は, `json-server`に保存することになります.
Reactはサーバからノートをフェッチして画面にレンダリングします.
新しいノートがアプリケーションに追加されるたびに, Reactのコードはそれをサーバに送信して,
新しいノートを「メモリ」に永続化します.

`json-server`は, サーバ上にある`db.json`ファイルにすべてのデータを格納します.
現実の世界では, データは何らかのデータベースに格納されます.
ただし, `json-server`は, 開発段階でサーバ側の機能をプログラムする必要がなく使用できる便利なツールです.

このコースのパート3では, サーバ側の機能を実装する原則について詳しく説明します.