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

## The browser as a runtime environment
最初のタスクは, 既存のノートを http://localhost:3001/notes からReactアプリケーションにフェッチすることです.

パート0のサンプルプロジェクトでは, JavaScriptを使用してサーバからデータを取得する方法を既に学びました.
この例のコードでは, `XMLHttpRequest`を使用してデータをフェッチしており, XHRオブジェクトを使用して行われるHTTPリクエストとして知られています.
この手法は1999年に導入され, すべてのブラウザがこれまでずっとサポートしてきました.

XHRの使用はもはや推奨されなくなりました.
ブラウザは, XHRで使用されるイベント駆動形モデルの代わりに,
いわゆるPromiseに基づく`fetch`メソッドをすでに広くサポートしています.

パート0からのリマインダーとして (実際には差し迫った理由なしに使用しないことを覚えておくべきです),
データはXHRを使用して次のようにフェッチされました.

```js
const xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText)
    // handle the response that is saved in variable data
  }
}

xhttp.open('GET', '/data.json', true)
xhttp.send()
```

最初に, HTTPリクエストを表す`xhttp`オブジェクトにイベントハンドラを登録していますが,
このイベントハンドラは`xhttp`オブジェクトの状態が変化するたびにJavaScriptから呼び出されます.
状態の変化がリクエストに対するレスポンスが到着したことを意味しているのであれば, それに応じてデータを処理します.

イベントハンドラのコードは, リクエストがサーバに送信される前に定義されていることに注意してください.
これにもかかわらず, イベントハンドラ内のコードは, 後で実行されます.
したがって, コードは「上から下」に同期的に実行されるのではなく, 非同期的に実行されます.
JavaScriptは, ある時点での要求に対して登録されたイベントハンドラを呼び出します.

たとえば, Java言語で一般的なリクエストを同期的に行う方法は, 次のようになります. (これは実際にはJavaのコードではありません.)

```js
HTTPRequest request = new HTTPRequest();

String url = "https://fullstack-exampleapp.herokuapp.com/data.json";
List<Note> notes = request.get(url);

notes.forEach(m => {
  System.out.println(m.content);
});
```

Javaでは, コードは一行ずつ実行され, HTTPリクエストを待機するために停止し, `request.get(...)`の実行が完了するのを待機します.
コマンドによって返されたデータ, この場合はノートが変数に格納され, 所望の方法でデータの操作を開始します.

一方, JavaScriptエンジンまたはランタイム環境は, 非同期モデルに従います.
原則として, これには全てのIO操作 (一部の例外を除く) がノンブロッキングIOとして実行される必要があります.
これは, IO関数を呼び出した直後に, コードが終了するのを待たずに, コードの実行が継続されることを意味します.

非同期操作が完了したとき, 具体的には完了後のある時点で, JavaScriptエンジンはその操作に登録されているイベントハンドラを呼び出します.

現在, JavaScriptエンジンはシングルスレッド化されているため, コードを並列実行することはできません.
そのため, 実際にはIO操作を実行するためにノンブロッキングモデルを使用することが要求されています.
そうしなければ, ブラウザは, 例えばサーバからのデータ取得中に「フリーズ」してしまいます.

JavaScriptエンジンのこのシングルスレッドの性質のもう一つの結果は,
コードの実行に多くの時間を用する場合, ブラウザは実行中にスタックすることです.
アプリケーションのトップに次のコードを追加したとします.

```js
setTimeout(() => {
  console.log('loop..')
  let i = 0
  while (i < 50000000000) {
    i++
  }
  console.log('end')
}, 5000)
```

上記のコードを追加した場合, 5秒間はすべてが正常に動作します.
しかし, `setTimeout`のパラメータとして定義されている関数を実行すると, 長いループの実行中はブラウザが動作しなくなります.
少なくともChromeでは, ループ実行中はブラウザのタブすら閉じることができません.

ブラウザの応答性を維持するには, つまり, ユーザの操作に十分な速さで継続的に反応できるようにするためには,
コードロジックを一つの計算に時間がかかりすぎないようにする必要があります.

このテーマに関する追加資料は, インターネット上にたくさんあります.
このトピックの中でも特に明確なプレゼンテーションは, Philip Roberts氏による基調公園<a href="https://www.youtube.com/watch?v=8aGhZQkoFbQ">"What the heck is the event loop anyway?"</a>です.

今日のブラウザでは, いわゆる<a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">web workers</a>の助けを借りて, 並列化されたコードの実行が可能です.
ただし, 個々のブラウザウィンドのイベントループは, 依然として単一のスレッドによってのみ処理されます.


## npm