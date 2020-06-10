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

## Multiple components
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

## props: コンポーネントへのデータの受け渡し
`props`と呼ばれる仕組みを利用してコンポーネントにデータを渡すことが可能です.

`Hello`コンポーネントを次のように変更してみましょう.

```js
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}
```

ここでは, コンポーネントを定義する関数は, `props`のパラメータを持っています.
引数として, パラメータはオブジェクトを受け取ります.
オブジェクトには, コンポーネントのユーザが定義するすべての`props`に対応するフィールドを持っています.

`props`は次のように定義されています.

```js
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" />
      <Hello name="Daisy" />
    </div>
  )
}
```

`props`の数は任意であり, その値はハードコードされた文字列またはJavaScriptの式の結果です.
`props`の値がJavaScriptを用いて求められる場合は, 中括弧で囲む必要があります.

`Hello`コンポーネントが2つの`props`を使用するようにコードを変更してみましょう.

```js
const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}
```

`App`コンポーネントから送信される`props`は, 変数の値, 足し算の評価結果, および普通の文字列です.

## 注意事項
Reactはかなり明確なエラーメッセージを生成するように構成されています.
これにもかかわらず, 少なくとも最初は, <em>非常に小さなステップで進み</em>,
すべての変更が期待通りに機能することを確認する必要があります.

<em>コンソールは常に開いている必要があります</em>.
ブラウザがエラーを報告する場合, 奇跡を期待して, さらにコードを書き続けることはおすすめしません.
代わりに, 例えば, 前の状態に戻る必要があります.

<img src="https://fullstackopen.com/static/d6976fc68cf1d476dfdad2730e4614d5/14be6/2a.png">

Reactでは, コード内に`console.log()`コマンドを書くことが可能であり,
それには価値があることを覚えておいてください.

また, <em>Reactコンポーネント名は大文字にする必要がある</em>ことに注意してください.
次のようにコンポーネントを定義しようとします.

```js
const footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  )
}
```

そして次のようにそれを使用します.

```js
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <footer />
    </div>
  )
}
```

ページには`footer`コンポーネント内で定義されたコンテンツが表示されず,
代わりにReactは空の`footer`要素のみを生成します.
コンポーネント名の最初の文字を大文字に変更すると, Reactは`Footer`コンポーネント内に定義された`div`要素を生成し,
ページ上にレンダリングします.

Reactコンポーネントのコンテンツには（通常）1つのルート要素が含まれている必要があることに注意してください.
たとえば, 一番外側の`div`要素を含まない`App`コンポーネントを定義しようとすると, 次のようになります.

```js
const App = () => {
  return (
    <h1>Greetings</h1>
    <Hello name="Maya" age={26 + 10} />
    <Footer />
  )
}
```

結果はエラーメッセージが表示されます.

<img src="https://fullstackopen.com/static/262aaa0606d06ab2651f4c2fc3b8a4c0/14be6/3e.png">

ルート要素を使用することが唯一の動作オプションではありません.
コンポーネントの配列を用いることも有効な解決策です.

```js
const App = () => {
  return [
    <h1>Greetings</h1>,
    <Hello name="Maya" age={26 + 10} />,
    <Footer />
  ]
}
```

しかしながら, アプリケーションのルートコンポーネントを定義する場合,
これは特に賢明な解決策というわけではなく, コードが少し見づらくなります.

ルート要素が規定されているため, DOMツリーには余分な`div`要素が存在します.
これはフラグメントを使用すること, つまり, コンポーネントが返す要素を空の要素で包むことで回避できます.

```js
const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  )
}
```

これでコードは正常にコンパイルされ, Reactによって生成されたDOMに余分な`div`要素が含まれなくなりました.

## Exercises 1.1. - 1.2.
演習はGitHubを介して提出し, <a href="https://studies.cs.helsinki.fi/stats/courses/fullstackopen">提出システム</a>
で完了した演習にマークをつけます.

このコースのすべての演習を同じリポジトリで送信するか, 複数のリポジトリを使用できます.
異なるパートの演習を同じリポジトリで提出する場合は, ディレクトリに適切な命名規則を使用してください.

提出リポジトリの非常に機能的なフォルダ構造は以下の通りです.

```
part0
part1
  courseinfo
  unicafe
  anecdotes
part2
  phonebook
  countries
```

<a href="https://github.com/fullstack-hy2020/example-submission-repository">こちら</a>をご覧ください!!

コースの各パートにはディレクトリがあり, Part1の「unicafe」のような一連の演習を含むディレクトリにさらに分岐します.

一連の演習の各Webアプリケーションについて, `node_modules`ディレクトリを除く,
そのアプリケーションに関するすべてのファイルを送信することをおすすめします.

演習は一度に1パートずつ送信されます.
あるパートのコースの演習を提出すると, 同じパートの残りの演習は提出できなくなります.

このパートでは, 以下にある演習以外にも演習があることに注意してください.
このパートで提出したい課題をすべて完了するまでは, 提出しないでください.

## 1.1: course infromation, step 1