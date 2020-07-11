# Rendering a collection, modules
新しいトピックに進む前に, 昨年難しいと判明したトピックのいくつかを要約してみましょう.

## console.log
経験豊富なJavaScriptプログラマーと初心者の違いは何でしょうか？
経験豊富な人たちは`console.log`を初心者の10 ~ 100倍以上使用します.

逆説的に言えば, 新人プログラマーが経験者よりも`console.log` (または任意のデバッグ方法)
を必要としているにもかかわらず, これは真実のようです.

何かがうまく動作しないときは, 何が悪いのかを推測するだけではいけません.
代わりに, ログに記録するか, 他のデバッグ方法を使用してください.

注意: Part1で説明したように, `console.log`を使用してデバッグする場合は,
"Java"のようにプラス記号で連結してください.

```js
console.log('props value is' + props)
```

代わりに, カンマで分割して以下のように記述してください.

```js
console.log('props value is', props)
```

最初の例のように, オブジェクトを文字列と連結してコンソールに出力すると, 結果は非常に役に立たないものとなります.

```js
props value is [Object object]
```

逆に, 上の2つ目の例のように, カンマで区切られた別々の引数としてオブジェクトを`console.log`に渡すと,
オブジェクトの中身は調査しがいのある文字列として開発者コンソールに出力されます.
必要であれば, Reactアプリケーションのデバッグの詳細については<a href="https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#debugging-react-applications">こちら</a>を参照してください.


## Protip: Visual Studio Code snippets
Visual Studio Code (VS Code)では, "snippets", つまり, Netbeansの"sout"の挙動のように,
よく利用されるコード片をすばやく生成するためのショートカットを簡単に作成することができます.
スニペットの作成方法は<a href="https://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets">こちら</a>を参照してください.

便利な既製のスニペットは, たとえば<a href="https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets">こちら</a>のVS Codeプラグインとしても見つかります.

最も重要なスニペットは, `clog`など, `console.log()`コマンドのスニペットです.
これは次のように作成できます.

```js
{
  "console.log": {
    "prefix": "clog",
    "body": [
      "console.log('$1')",
    ],
    "description": "Log output to console"
  }
}
```

## JavaScript Arrays
ここからは, `find`, `filter`, `map`のようなJavaScript配列の関数型プログラミングメソッドを常用します.
これらは, Java 8のストリームと同じ一般的な原則に基づいて動作します.
Java 8のストリームは, 個々数年, 大学のコンピュータサイエンス学部の"Ohjelmoinnin perusteet"コースと"Ohjelmoinnin jatkokurssi"コースの両方で使用されており, Massive Open Online Course(MOOC)のプログラミングでも使用されます.

配列を使用した関数型プログラミングに慣れていない場合は,
YouTubeビデオシリーズの<a href="https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84">"Functional Programming in JavaScript"</a>の最初の3パートは少なくとも見ておく価値があります.
- <a href="https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84">Higher-order functions </a>
- <a href="https://www.youtube.com/watch?v=bCqtb-Z5YGQ&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84&index=2">Map</a>
- <a href="https://www.youtube.com/watch?v=Wl98eZpkp-c&t=31s">Reduce basics</a>

## Event handlers revisited
昨年のコースに基づいて, イベント処理は難しいということが分かりました.
トピックに関する固有の知識にブラッシュアップが必要であると思われる場合は,
前のパートの最後にある"event handlers revisited"をもう一度読み返して見ましょう.

`App`コンポーネントの子コンポーネントにイベントハンドラを渡すことで, いくつかの疑問が生じてくるでしょう.
このトピックに関する記載は<a href="https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#passing-event-handlers-to-child-components">こちら</a>にあります.

## Rendering collections
ここでは, Part0のアプリケーションの例と似たようなアプリケーションの"フロントエンド",
つまりブラウザサイドのアプリケーションロジックをReactで実装します.

以下の例からはじめましょう.

```js
import React from 'react'
import ReactDOM from 'react-dom'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul>
    </div>
  )
}

ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
)
```

各ノートには, テキストの内容とタイムスタンプの他に, ノートが重要なものに分類されているかどうかを示す`boolean`値と,
ユニークな`id`が含まれています.

上記の例は, 配列内に正確に3つのノートがあるという事実により機能します.
ハードコードされたインデックス番号を参照して配列内のオブジェクトにアクセスすることにより,
1つのノードがレンダリングされます.

```js
<li>{notes[1].content}</li>
```

もちろん, これは実用的ではありません.
これを改善するためには, `map`関数を使用して配列オブジェクトからReact要素を生成します.

```js
notes.map(note => <li>{note.content}</li>)
```

結果は`li`要素の配列です.

```js
[
  <li>HTML is easy</li>,
  <li>Browser can execute only Javascript</li>,
  <li>GET and POST are the most important methods of HTTP protocol</li>,
]
```

これは`ul`タグ内に配置できます.

```js
const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <li>{note.content}</li>)}
      </ul>
    </div>
  )
}
```

`li`タグを生成するコードはJavaScriptであるため, 他のすべてのJavaScriptコードと同様に,
JSXテンプレートでは中括弧で囲む必要があります.

また, アロー関数の宣言を複数行に分けることにより, コードを読みやすくできます.

```js
const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <li>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}
```

## Key-attribute
アプリケーションが機能しているように見えても, コンソールに厄介な警告が表示されます.

<img src="https://fullstackopen.com/static/fbe2815380db6eb1be707011330d79e1/14be6/1a.png">

エラーメッセージのリンク先のページで示されているように, リスト項目, つまり`map`メソッドによって生成された要素は,
それぞれが一意のキー値, つまり`key`とよばれる属性を持つ必要があります.

キー値を追加しましょう.

```js
const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}
```

キー値を追加すると, エラーメッセージが消えます.

Reactは, 配列内のオブジェクトの`key`属性を使用して, コンポーネントが再レンダリングされたときに
コンポーネントによって生成されたビューを更新する方法を決定します.
これについての詳細は<a href="https://reactjs.org/docs/reconciliation.html#recursing-on-children">こちら</a>をご覧ください.

## Map
配列のメソッドである`map`がどのような挙動を示すかを理解することは, 残りのコースでは非常に重要です.

アプリケーションには`notes`という配列が含まれています.

```js
const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]
```

少し立ち止まって, `map`がどのように機能するかを見てみましょう.

次のコードがファイルの末尾に追加されているとしましょう.

```js
const result = notes.map(note => note.id)
console.log(result)
```

`[1, 2, 3]`がコンソールに出力されます.
`map`は常に新しい配列を生成します.
その要素は,元の配列の要素からマッピング,
つまり, `map`メソッドのパラメータに指定された関数を使用して作成されます.

```js
note => note.id
```

上記の関数はコンパクトな形で書かれたアロー関数です.
省略しない形式は次のようになります.

```js
(note) => {
  return note.id
}
```

関数はパラメータとして`note`オブジェクトを取得し, その`id`フィールドの値を返します.

コマンドを次のように変更します.

```js
const result = notes.map(note => note.content)
```

結果は`note`のコンテンツを含む配列になります.

これは, 既に使用したReactコードにかなり近いものです.

```js
notes.map(note =>
  <li key={note.id}>{note.content}</li>
)
```

各`note`オブジェクトから`note`の`content`を含む`li`タグを生成します.

関数パラメーターが`map`メソッドに渡されるため,

```js
note => <li key={note.id}>{note.content}</li>
```

上記のコードがビューを作成するために使用され,
変数の値は中括弧の内側にレンダリングする必要があります.
中括弧を削除するとどうなるかを確認してください.

中括弧を使用すると最初は頭痛の種になりますが, すぐに慣れます.
Reactからの資格的なフィードバックはすぐに得られます.

## Anti-pattern: array indexes as keys
配列のインデックスをキーとして使用して, コンソールのエラーメッセージを非表示にすることもできます.
インデックスは, `map`メソッドのコールバック関数に2番目のパラメーターを渡すことで取得できます.

```js
notes.map((note, i) => ...)
```

このように呼び出されると, `i`には`Note`が存在する配列内の位置のインデックスの値が割り当てられます.

したがって, エラーを発生させずに行を定義する1つの方法は次の通りです.

```js
<ul>
  {notes.map((note, i) =>
    <li key={i}>
      {note.content}
    </li>
  )}
</ul>
```

ただし, これはお勧めできません.
正常に機能しているように見えても, 望ましくない問題が発生する可能性があります.
これについて詳しくは, <a href="https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318">こちら</a>をご覧ください.


## Refactoring modules
コードを少し整理してみましょう.
propsの`notes`フィールドのみに関心があるので, 分割代入を使用してそれを直接取得します.

```js
const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}
```

分割代入の意味と仕組みを忘れた場合は, <a href="https://fullstackopen.com/en/part1/component_state_event_handlers#destructuring">これ</a>を確認してください.

単一の`Note`の表示を独立したコンポーネントに分離します.

```js
const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}
```

`key`属性は, 以前のように`li`タグではなく, `Note`コンポーネントに対して定義する必要があることに注意してください.

Reactアプリケーション全体を1つのファイルに書き込むことができます.
もちろん, それはあまり実用的ではありません.
一般的な方法は, 各コンポーネントを独自のファイルでES6モジュールとして宣言することです.

今までずっとモジュールを使っています.

```js
import React from 'react'
import ReactDOM from 'react-dom'
```

ファイルの最初の2行では2つのモジュールをインポートし, それらを`index.js`内で使用できるようにしています.
reactモジュールは`React`という変数に割り当てられ, react-domは`ReactDOM`という変数に割り当てられます.

`Note`コンポーネントを独立したモジュールに移動してみましょう.

小さなアプリケーションでは, コンポーネントは通常, componentsと呼ばれるディレクトリに配置されます.
このディレクトリは, srcディレクトリ内に配置されます.
命名規則はコンポーネントにちなんだファイル名をつけることです.

次に, アプリケーション用のcomponentsと呼ばれるディレクトリを作成し, `Note.js`という名前のファイルをその中に配置します.
`Note.js`ファイルの内容は次の通りです.

```js
import React from 'react'

const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}

export default Note
```

これはReactコンポーネントなので, 必ずreactモジュールをインポートする必要があります.

モジュールの最後の行は, 宣言されたモジュールである`Note`変数をエクスポートします.

これで, コンポーネントを使用しているファイル (`index.js`)がモジュールをインポートできるようになりました.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Note from './components/Note'

const App = ({ notes }) => {
  // ...
}
```

モジュールによってエクスポートされたコンポーネントは, 以前と同じように,
変数`Note`で使用できるようになりました.

独自コンポーネントをインポートするときは, インポートするファイルに関連してそれらの場所を
指定する必要があることに注意してください.

```js
'./components/Note'
```

冒頭のピリオド -`.`- はカレントディレクトリを指しているので,
モジュールの場所はカレントディレクトリのcomponentsサブディレクトリにある`Note.js`というファイルになります.
ファイルの拡張子 -`.js`- は省略することができます.

`App`はコンポーネントでもあるので, 独自のモジュールでも宣言しましょう.
これはアプリケーションのルートコンポーネントであるため, srcディレクトリに配置します.
ファイルの内容は次の通りです.

```js
import React from 'react'
import Note from './components/Note'

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) =>
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App
```

モジュールには, コンポーネント宣言を独自のファイルに分離できるようにする以外にも, 様々な用途があります.
このコースの後半でそれらについて見ていきます.

アプリケーションの現在のコードは<a href="https://github.com/fullstack-hy2020/part2-notes/tree/part2-1">GitHub</a>にあります.

リポジトリのマスターブランチには, アプリケーションの新しいバージョンのコードが含まれていることに注意してください.
現在のコードは<a href="https://github.com/fullstack-hy2020/part2-notes/tree/part2-1">part2-1</a>ブランチにあります.

<img src="https://fullstackopen.com/static/f356d587d39215504b8bd17318b6b603/14be6/2e.png">

プロジェクトを複製する場合は, `npm start`でアプリケーションを開始する前に,
`npm install`コマンドを実行してください.

## When the application breaks
プログラミングキャリアの初期の頃 (そしてあなたのように30年間コーディングしてきた後でも),
アプリケーションが完全に壊れてしまうことがよくあります.
これは, JavaScriptのような動的型付けされた言語の場合はなおさらのことで,
コンパイラが例えば関数変数や戻り値のデータ型をチェックしません.

"Reactの爆発"は, 例えば次のようになります.

<img src="https://fullstackopen.com/static/c44f00492b83cda870b1bda682ff583f/14be6/3b.png">

こららの状況では, 最善の方法は`console.log`を用いることです.
爆発の原因となったコードは次の通りです.

```js
const Course = ({ course }) => (
  <div>
   <Header course={course} />
  </div>
)

const App = () => {
  const course = {
    // ...
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}
```

コードに`console.log`コマンドを追加して, 故障の原因に迫ります.
最初にレンダリングされるのは`App`コンポーネントなので, 最初の`console.log`をそこに置くことには価値があります.

```js
const App = () => {
  const course = {
    // ...
  }

  console.log('App works...')

  return (
    // ..
  )
}
```

コンソール上の表示を見るためには, エラーの長い赤い壁を上にスクロールしなければなりません.

<img src="https://fullstackopen.com/static/0f858d815c1abe509e04008e7d00d8d8/14be6/4b.png">

一つの機能がうまくいっているとわかったら, もっと深くログを取るときです.
コンポーネントが単一の文として宣言されていたり, `return`のない関数として宣言されていたりすると,
コンソールへの出力が難しくなります.

```js
const Course = ({ course }) => (
  <div>
   <Header course={course} />
  </div>
)
```

表示を追加するためには, コンポーネントを長い形式に変更する必要があります.

```js
const Course = ({ course }) => {
  console.log(course)
  return (
    <div>
    <Header course={course} />
    </div>
  )
}
```

多くの場合, 問題の原因は, propsが異なる型であると期待されていたり,
実際とは異なる名前で呼ばれていたりして, 結果として分割代入が失敗していることにあります.
この問題の多くは, 分割代入が取り除かれたときに解決し始めることが多く, propsが実際には何を含んでいるかを見てみましょう.

```js
const Course = (props) => {
  console.log(props)
  const { course } = props
  return (
    <div>
    <Header course={course} />
    </div>
  )
}
```

それでも問題が解決されない場合は, コードの周りに`console.log`文を追加してバグを探し続ける以外にできることはほとんどありません.

次の問題の模範解答が完全に動作しなくなった後(propsの型が間違っていたため),
`console.log`を使ってデバッグしなければなかったので, この章を教材に追加しました.

## Exercises 2.1. -2.5.
演習はGitHub経由で提出し, <a href="https://studies.cs.helsinki.fi/stats/courses/fullstackopen">提出システム</a>
で演習を行ったものとしてマークをつけることで提出されます.

すべての演習を同じリポジトリに送信するか, 複数の異なるリポジトリを使用できます.
異なるパートの演習を同じリポジトリに提出する場合, ディレクトリには適切な名前をつけてください.

演習は一度に1パートずつ提出されます.
あるパートの演習を提出すると, そのパートの他の演習は送信できなくなります.

このパートには前回のパートよりも多くの演習があるため,
提出したいこのパートの演習をすべて終わらせる前に演習を提出しないでください.

警告: `create-react-app`は, 既存のgitリポジトリの中でアプリケーションを作成しない限り, プロジェクトを自動的にgitリポジトリに変えてしまします. たいていの場合, それぞれのプロジェクトを別々のリポジトリにしたくないので, アプリケーションのルートで`rm -rf .git`コマンドを実行して.gitフォルダを削除しましょう.


## 2.1: Course infomation step6
演習1.1 ~ 1.5の講座内容をレンダリングするコードを完成させましょう.
演習は模範解答のコードから始めることができます.
パート1の模範解答は, <a href="https://studies.cs.helsinki.fi/stats/courses/fullstackopen">提出システム</a>にアクセスして,
上部にあるmy submisionsをクリックし, solution列の下にあるパート1に対応する行でshowをクリックすることで見つけることができます.
course info 演習の模範解答を見るには, kurssitiedot ("kurssitiedot"は"course info"を意味します) の下にある`index.js`をクリックしてください.

プロジェクトをある場所から別の場所にコピーした場合, `node_modules`ディレクトリを削除し,
`npm install`コマンドで依存関係を解決し直さなければならないことに注意してください.
一般的に, プロジェクトの全体の内容をコピーしたり, `node_modules`ディレクトリをバージョン管理システムに追加したりすることは推奨されません.

`App`コンポーネントを次のように変更してみましょう.

```js
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}
```

`Course`と呼ばれる単一のコースの書式設定を担当するコンポーネントを定義します.

アプリケーションのコンポーネント構造は例えば次のようになります.

```js
App
  Course
    Header
    Content
      Part
      Part
      ...
```

したがって, `Course`コンポーネントには, 前回のパートで定義されたコンポーネントが含まれ,
コース名とそのパートのレンダリングを担当します.

レンダリングされたページは, 例えば次のようになります.

<img src="https://fullstackopen.com/static/6e12df59c1c9e28c39ebdbe1b41ccf97/14be6/8e.png">

演習数の合計はまだ必要ありません.

アプリケーションはコースのパート数に関係なく動作する必要があるため, コースのパートを追加または削除した場合でもアプリケーションが機能することを確認してください.

コンソールにエラーが表示されないことも確認してください.


## 2.2: Course information step7
コースの演習数の合計も表示してください.

<img src="https://fullstackopen.com/static/2d8aa950189db6cf2eeb794181429ae9/14be6/9e.png">


## 2.3: Course information step8
まだ実行していない場合は, 配列メソッド`reduce`を使用して演習の合計を計算してください.

Pro tip: コードが次のようになっている場合,

```js
const total =
  parts.reduce((s, p) => someMagicHere)
```

プログラムが正常に動作しない場合は, `console.log`を使ってみる価値があります.
`console.log`を使用してデバッグを行う場合には, アロー関数を省略しない形式で記述する必要があります.

```js
const total = parts.reduce((s, p) => {
  console.log('what is happening', s, p)
  return someMagicHere
})
```

Pro tip2: アロー関数の省略しない形式に, またはその逆に自動的に変換する<a href="https://marketplace.visualstudio.com/items?itemName=cmstead.jsrefactor">VS Code用のプラグイン</a>があります.

<img src="https://fullstackopen.com/static/3d941b76fc2e66aa39e0198aa1ef0a56/14be6/5b.png">

## 2.4: Course information step9
アプリケーションを拡張して, 任意のコース数に対応可能なようにしましょう.

```js
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      // ...
    </div>
  )
}
```

たとえば, アプリケーションは次のようになります.

<img src=">https://fullstackopen.com/static/8c1ce3363ec056cd15c5edacbeec3370/14be6/10e.png">

## 2.5: separate module
`Course`コンポーネントを別のモジュールとして宣言しましょう.
そして, `App`コンポーネントによってインポートされるようにしましょう.
コースのすべてのサブコンポーネントを同じモジュールに含めても問題ありません.
