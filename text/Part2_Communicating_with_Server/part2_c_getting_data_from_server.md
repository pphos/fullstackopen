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
サーバからデータを取得するトピックに戻りましょう.

前述のPromiseベースの`fetch`関数を使用して, サーバからデータを取得することができます.
Fetch APIは優れたツールであり, IEを除く全てのモダンなブラウザでサポートされています.

つまり, ブラウザとサーバ間の通信には代わりに`axios`ライブラリを使うことになります.
`axios`ライブラリは`fetch`と似たような機能を持ちますが, より快適に使うことができます.
`axios`を使用するもう一つの理由は, Reactプロジェクトに外部ライブラリ (いわゆるnpmパッケージ) を追加することに慣れていることです.

現在, ほとんどすべてのJavaScriptプロジェクトは, node package manager (別名npm)を使用して定義されています.
`create-react-app`を使って作成されたプロジェクトもnpmの形式に従っています.
プロジェクトがnpmの形式に基づいていることを示す明確な指標は, プロジェクトのルートに存在する`package.json`ファイルです.

```js
{
  "name": "notes",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.4.0",
    "@testing-library/user-event": "^7.2.1",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "3.3.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

この時点で, プロジェクトがどのような依存関係, つまり外部ライブラリを持っているかを定義しているので,
`dependencies`の部分に最も関心があります.

次に, `axios`を使用します.
理論的には, `package.json`ファイルでライブラリを直接定義できますが,
コマンドラインからインストールすることをお勧めします.

```js
npm install axios --save
```

注意: `npm`コマンドは常に, `package.json`ファイルが見つかるプロジェクトのルートディレクトリで実行する必要があります.

Axiosが他の依存関係に含まれるようになりました.

```js
{
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.4.0",
    "@testing-library/user-event": "^7.2.1",
    "axios": "^0.19.2",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "3.3.0"
  },
  // ...
}
```

依存関係に`axios`を追加するだけでなく, `npm install`コマンドではライブラリコードもダウンロードしました.
他の依存関係と同様に, コードはプロジェクトルートにある`node_modules`ディレクトリに存在します.
お気づきかも知れませんが, `node_modules`にはかなりの量の興味深いものが含まれています.

さらに追加していきましょう.
次のコマンドを実行して, 開発時の依存関係として`json-server`をインストールします. これは開発環境時のみに使用されます.

```js
npm install json-server --save-dev
```

そして, `package.json`の`scripts`項目に以下の変更を加えます.

```js
{
  // ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 --watch db.json"
  },
}
```

これで, パラメータ定義なしで, 以下のコマンドを使用してプロジェクトのルートディレクトリからjson-serverを簡単に起動できます.

```js
npm run server
```

コースのパート3では, より`npm`ツールに親しんでいきます.

注意: 以前に開始したjson-serverは, 新しいjson-serverを開始する前に終了する必要があります.
そうしなければ, 問題が発生します.

<img src="https://fullstackopen.com/static/7f3c94f76fa1a5a1e55bf4dcd691d3e8/5a190/15b.png">

エラーメッセージの赤字は, 問題について通知しています.

<i>3001番ポートにバインドできません. --port引数またはjson-server.jsonファイルを使用して別のポート番号を指定してください</i>

ご覧のように, アプリケーションはそれ自体を3001番ポートにバインドできません.
その理由は, 3001番ポートが以前に開始されたjson-serverによって既に占有されているためです.

`npm install`コマンドを2回使用しましたが, これらには若干の違いがあります.

```js
npm install axios --save
npm install json-server --save-dev
```

パラメータには細かな違いがあります.
プログラムの実行にはライブラリの存在が必要であるため, `axios`はアプリケーションのランタイム依存関係 (--save) としてインストールされます.
一方, `json-server`はプロジェクトのプログラム自体が必要としないため, 開発依存関係 (--save-dev) としてインストールされました.
開発依存関係はソフトウェア開発中のサポートに使用されます.
コースの次のパートでは, さまざまな依存関係について詳しく説明します.

## Axios and promises
これでaxiosを使用する準備ができました.
今後, json-serverは3001番ポートで実行されていると想定しています.

注意: json-serverとreactアプリを同時に実行するには, 2つのターミナルウィンドウを使用する必要がある場合があります.
1つのターミナルでjson-serverを実行し続け, もう一つのターミナルでreact-appを実行してください.

ライブラリは, Reactなどの他のライブラリと同様に使用できます.
つまり, 適切な`import`文を使用することでライブラリを利用できます.

次のコードを`index.js`に追加しましょう.

```js
import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)
```

以下の警告文はコンソールに表示されます.

<img src="https://fullstackopen.com/static/823a2e7f414c99cb849a42470e4f372d/5a190/16b.png">

Axiosの`get`メソッドはpromiseを返します.

Mozillaのサイトのドキュメントでは, promiseについて次のように述べています.

  Promiseは, 非同期処理の最終的な完了または失敗を表すオブジェクトです.

つまり, Promiseは非同期処理を表すオブジェクトであり, promiseには異なる3つの状態があります.

1. pendding: 最終的な値 (次の2つのうち1つ) がまだ利用できていないことを意味します.
2. fulfilled: 処理が完了・成功して, 最終的な値が利用可能になったことを意味します. この状態を`resolvedと呼ぶこともあります.
3. rejected: エラーが原因で処理に失敗し, 最終的な値が決定できなかったことを意味します.

例に上げたコードの最初のpromiseはfulfilledであり, `axios.get('http://localhost:3001/notes')`のリクエストの成功を表しています.
ただし, 2つ目のリクエストはrejectedされ, その原因がコンソールに表示されます.
どうやら, 存在しないアドレスにHTTP GETリクエストを送信しようとしていたようです.

promiseで表される処理の結果にアクセスしたい場合は, イベントハンドラをpromiseに登録する必要があります.
これは次のメソッドを使用して実現されます.

```js
const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
  console.log(response)
})
```

以下がコンソールに表示されます.

<img src="https://fullstackopen.com/static/ea48db35e4b6b6ee75bd0b7795ea958c/5a190/17e.png">

JavaScriptの実行環境は, `then`メソッドで登録されたコールバック関数を呼び出し, `response`オブジェクトをパラメータとして提供します.
`response`オブジェクトには, HTTP GETリクエストに関連するすべての重要なデータが含まれており,
返されたデータ, ステータスコード, ヘッダなどが含まれます.

通常,  promiseオブジェクトを変数に格納する必要はありません.
代わりに, `then`メソッド呼び出しを`axios`メソッド呼び出しにチェーンして, 直接それに従うようにすることが一般的です.

```js
axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  console.log(notes)
})
```

コールバック関数は, レスポンスに含まれるデータを取得して変数に格納し, ノートをコンソールに出力します.

チェーンメソッド呼び出しをフォーマットするより読みやすい方法は, それぞれのメソッド呼び出しを別々の行に配置することです.

```js
axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })
```

サーバから返されるデータはプレーンテキストであり, 基本的には長い文字列です.
サーバが`context-type`ヘッダを利用してデータ形式を`application/json;charset=utf8`(前の画像を参照)と指定しているので,
`axios`ライブラリはデータをJavaScriptの配列にパースすることができます.

やっとサーバから取得したデータを使い始めることができます.

ローカルサーバにノートをリクエストして, 最初はAppコンポーネントそしてレンダリングしてみましょう.
レスポンスを正常に取り出せた場合にのみAppコンポーネント全体をレンダリングするため,
このアプローチには多くの問題があることに注意してください.

```js
import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'

import axios from 'axios'

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  ReactDOM.render(
    <App notes={notes} />,
    document.getElementById('root')
  )
})
```

この方法は状況によっては許容できる場合もありますが, やや問題があります.
代わりに, データのフェッチをAppコンポーネントに移動しましょう.

## Effect-hooks

