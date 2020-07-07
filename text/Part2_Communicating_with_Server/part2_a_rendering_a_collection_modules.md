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

