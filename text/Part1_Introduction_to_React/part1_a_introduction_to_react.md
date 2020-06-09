# Introducation to React

このコースでは, おそらく最も重要なトピックである<a href="https://reactjs.org/">Reactライブラリ</a>について理解を深めていきましょう.
まずは簡単なReactアプリケーションを作ることから始め, Reactのコアな概念を知ることから始めましょう.

これまでのところ, Reactを始める最も簡単な方法は, `create-react-app`というツールを使うことです.
Nodeとともにインストールされた`npm`のバージョンが5.3以上であれば,
マシンに`create-react-app`をインストールすることが可能です. (ただし必須ではありません)

`part1`というアプリケーションを作成して, そのディレクトリに移動しましょう.

```bash
$ npx create-react-app part1
$ cd part1
```

ここでも今後でも, `$`で始まるすべてのコマンドは, コマンドラインに入力されます.
`$`の文字はプロンプトを表すため, 入力しないでください.

アプリケーションは次のコマンドで実行されます.

```bash
$ npm start
```

デフォルトでは, アプリケーションは http://localhost:3000 というアドレスのlocalhostの3000番ポートで実行されます.

上記のコマンドを実行するとChromeが自動で起動するはずです.
すぐにブラウザコンソールを開いてください.
また, テキストエディタを開いて, Webページとコードを同時に表示できるようにしましょう.

<img src="https://fullstackopen.com/static/182fc3f16b4e18cf968de9bbd7efa653/14be6/1e.png">

アプリケーションのコードは`src`フォルダにあります.
`index.js`の内容が次のようになるように, デフォルトのコードを単純化しましょう.

```js
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

`App.js`, `App.css`, `App.test.js`, `logo.svg`, `setupTest.js`, `serviceWorker.js`のファイルは,
現在のアプリケーションでは不要なので削除することができます.

## Component
`index.js`ファイルは, `App`という名前のReact-componentを定義し, 最後の行にある以下のコマンド

```js
ReactDOM.render(<App />, document.getElementById('root'))
```

は, コンテンツをdiv要素にレンダリングし, `public/index.html`で定義され, `root`のid属性を持ちます.

デフォルトでは, `public/index.html`は空です.
このファイルにHTMLを追加することができます.
しかし, Reactを使用する場合には, レンダリングする必要がある全てのコンテンツは通常,
Reactコンポーネントとして定義されています.

コンポーネントを定義するコードを詳しく見てみましょう.

```js
const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)
```

ご想像の通り, コンポーネントは`div`タグとしてレンダリングされ, Hello worldを含む`p`タグをラップします.

技術的には, コンポーネントはJavaScriptの関数として定義されます.
以下は引数を取らない関数です.

```js
() => (
  <div>
    <p>Hello world</p>
  </div>
)
```

次に, 関数は定数変数`App`に割り当てられます.

```js
const App = ...
```

JavaScriptで関数を定義する方法は複数あります.
ここでは, ECMAScript6 (ES6)と呼ばれるJavaScriptの新しいバージョンで導入されたアロー関数を使用しています.

この関数は一つの式のみで構成されているので, 次のコードのように省略表現を用いました.

```js
const App = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}
```

つまり, 関数は式の値を返します.

コンポーネントを定義する関数には, 任意の種類のJavaScriptのコードが含まれている可能性があります.
コンポーネントを以下のように変更して, コンソールで何が起こるかを観察してみてください.

```js
const App = () => {
  console.log('Hello from component')
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}
```

コンポーネント内で動的コンテンツをレンダリングすることもできます.

次のようにコンポーネントを変更してください.

```js
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  )
}
```

中括弧内のJavaScriptコードはすべて評価され,
この評価結果はコンポーネントによって生成されてHTMLの定義された場所に埋め込まれます.

## JSX
ReactコンポーネントがHTMLマークアップを返しているように思えますが, それは正しくありません.
Reactコンポーネントのレイアウトは, 主にJSXを用いて記述されています.
JSXはHTMLのように見えますが, 実はJavaScriptの記述法を扱っています.
内部的には, Reactコンポーネントによって返されるJSXはJavaScriptにコンパイルされます.

コンパイル後のアプリケーションコードは次のようになります.

```js
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
)
```

コンパイルは<a href="https://babeljs.io/repl/">Babel</a>によって処理されます.
`create-react-app`によって作成されたプロジェクトは, 自動的にコンパイルされるように構成されています.
このトピックの詳細については, コースのPart7で学習します.

JSXを使用せずにReactを"pure JavaScript"として記述することもできます.
とはいえ, まともな考えを持った人は, 実際にはそんなことはしないでしょう.

実際には, JSXはHTMLとよく似ていますが, JSXを使用すると,
波括弧内に適切なJavaScriptを記述して動的コンテンツを簡単に埋め込むことができます.

JSXの考え方は, Java Springに沿ってサーバサイドで使用されている
Thymeleafのような多くのテンプレート言語と非常によく似ています.

JSXは「XMLのようなもの」です. つまり, 全てのタグを閉じる必要があります.
例えば, 改行は空の要素であり, HTMLでは次のように記述できます.

```html
<br>
```

しかし, JSXを作成するときには, 以下のようにタグを閉じる必要があります.

```js
<br />
```

## Multi components
アプリケーションを次のように変更してみましょう.
(注: ファイルの先頭にあるインポートは, これらの例では省略されますが,
コードを実行するためには必須です.)

```js
const Hello = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

新しいコンポーネント`Hello`を定義し, `App`コンポーネント内で使用しました.
当然のことながら, コンポーネントは繰り返し使用することができます.

```js
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
      <Hello />
      <Hello />
    </div>
  )
}
```

Reactを使用したコンポーネント作成は簡単です.
コンポーネントを組み合わせることで, より複雑なアプリケーションでさえ,
非常に保守しやすくすることができます.
実際, Reactの中心的な哲学は, 多くの特化した再利用可能なコンポーネントからアプリケーションを構成することです.

もう一つの強力な規則は, アプリケーションコンポーネントツリーの最上位にある`App`と呼ばれるコンポーネントの考え方です.
それでも, Part6で学ぶように, `App`コンポーネントが正確に`root`ではなく,
適切なユーティリティコンポーネント内にラップされる状況があります.
