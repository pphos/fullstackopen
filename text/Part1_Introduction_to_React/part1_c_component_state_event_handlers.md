# Component state, event handlers

Reactでの作業に戻りましょう.

新しい例から初めます.

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

## Component helper functions
`Hello`コンポーネントを拡張して, 挨拶された人の誕生年を推測するようにしましょう.

```js
const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

誕生年を推測するためのロジックは, コンポーネントがレンダリングされたときに呼び出される独自関数に分離されています.

この関数はコンポーネントに渡されたすべての`props`に直接アクセスできるので, `age`をパラメータとして渡す必要はありません.

現在のコードをよく見てみると, ヘルパー関数は実際にはコンポーネントの動作を定義する別の関数の内部で
定義されていることに気づくでしょう.
Java言語では, 別の関数の内部で関数を定義することは複雑で面倒であるので, あまり一般的ではありません.
しかし, JavaScriptでは, 関数内部で関数を定義することは一般的に使われている手法です.

## Destuctureing
先に進む前に, ES6の仕様に追加されたJavaScriptの小さいながらも便利な機能について見てみましょう.
これにより, 代入時にオブジェクトや配列から値を分割できます.

前のサンプルコードでは, コンポーネントに渡されたデータを`props.name`および`props.age`として参照する必要がありました.
これらの2つの式のうち, コードで`props.age`を2回繰り返す必要がありました.

`props`はオブジェクトであるので,

```js
props = {
  name: 'Arto Hellas',
  age: 35,
}
```

プロパティの値を直接2つの変数`name`と`age`に直接代入することで,
コンポーネントを合理化することができコード内で使用できます.

```js
const Hello = (props) => {
  const name = props.name
  const age = props.age

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

`bornYear`関数を定義するときに, アロー関数の省略記法を利用していることに注意してください.
前述のように, アロー関数が単一の式で構成されている場合は, 関数本体を中括弧内に記述する必要はありません.
このよりコンパクトな形式では, 関数は単純に単一の式の結果を返します.

要約すると, 以下の2つの関数定義は同じ意味です.

```js
const bornYear = () => new Date().getFullYear() - age

const bornYear = () => {
  return new Date().getFullYear() - age
}
```

分割代入を使用すると, オブジェクトのプロパティ値を別々の変数に抜き出して集めることができるので,
変数の代入がさらに簡単になります.

```js
const Hello = (props) => {
  const { name, age } = props
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

デストラクチャリングしようとしているオブジェクトが複数の値を持っている場合,

```js
props = {
  name: 'Arto Hellas',
  age: 35,
}
```

`const {name, age} = props`という式は, `Arto Hellas`という値を`name`に, `35`を`age`に代入します.

デストラクチャリングを更に一歩するめることができます.

```js
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

上記の例では, コンポーネントに渡される`props`は, 変数`name`と`age`に直接分割代入されるようになりました.

つまり, `props`オブジェクト全体を`props`と呼ばれる変数代入する代わりに, そのプロパティを変数`name`と`age`に代入します.

```js
const Hello = (props) => {
  const { name, age } = props
```

コンポーネント関数にパラメータとして渡される`props`オブジェクトを分割することで,
プロパティの値を直接変数に割り当てます.

```js
const Hello = ({ name, age }) => {
```

## ページの再レンダリング
これまでのところ, すべてのアプリケーションは, 最初のレンダリング後も見た目が変わらないようになっています.
時間またはボタンをクリックしたときに値が増加するカウンターを作成したい場合はどうでしょうか？

以下のコードからはじめましょう.

```js
const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )
}

let counter = 1

ReactDOM.render(
  <App counter={counter} />,
  document.getElementById('root')
)
```

`App`コンポーネントには, `counter` propsの値を介してカウンターの値が与えられます.
このコンポーネントは, 値を画面にレンダリングします.
`counter`の値が変わるとどうなるでしょうか?
以下のようにカウンターの値を増加させたとしても,

```js
counter += 1;
```

コンポーネントは再レンダリングされません.
以下のように, `ReactDOM.render`メソッドをもう一度呼び出すことで, コンポーネントを再レンダリングできます.

```js
const App = (props) => {
  const { counter } = props
  return (
    <div>{counter}</div>
  )
}

let counter = 1

const refresh = () => {
  ReactDOM.render(<App counter={counter} />,
  document.getElementById('root'))
}

refresh()
counter += 1
refresh()
counter += 1
refresh()
```

再レンダリングコマンドは, コピーペーストされたコード量を削減するために, `refresh`関数内にラップされています.

これで, コンポーネントは3回レンダリングされます.
最初に1, 次に2, 最後に3が表示されます.
ただし, 1と2は, 気づかないほど短い時間に表示されます.

`setInterval`を用いて1病ごとに`counter`を再レンダリングおよびインクリメントすることで,
もう少し面白い機能を実装することができます.

```js
setInterval(() => {
  refresh()
  counter += 1
}, 1000)
```

`ReactDOM.render`メソッドを繰り返し呼び出すことは, コンポーネントを再レンダリングするための推奨される方法ではありません.
次に, この機能を達成するためのより良い方法を紹介します.

## Stateful component
これまでのコンポーネントは, コンポーネントのライフサイクル中に変化する可能性がある状態を一切含んでいないという意味で
シンプルなものでした.

次に, Reactの`state hook`を使用して, アプリケーションの`App`コンポーネントに状態を追加しましょう.

アプリケーションを次のように変更します.

```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

行頭でアプリケーションは`useState`関数をインポートしています.

```js
import React, { useState } from 'react'
```

コンポーネントを定義する関数の本体は, 関数呼び出しで始まります.

```js
const [ counter, setCounter ] = useState(0)
```

関数呼び出しは, コンポーネントに状態を追加し, 値ゼロで初期化された状態をレンダリングします.
この関数は, 2つのアイテムを含む関数を返します.
以前紹介した分割代入構文を使用して, アイテムを変数`counter`と`setCounter`に代入します.

変数`counter`には, 状態の初期値であるゼロが代入されます.
変数`setConter`には, 状態を修正するためにしようされる関数が代入されます.

アプリケーションは`setTimeout`関数を呼び出し, カウンタの状態をインクリメントする関数と
1秒のタイムアウトの2つのパラメータを渡します.

```js
setTimeout(
  () => setCounter(counter + 1),
  1000
)
```

最初のパラメータとして`setTimeout`関数に渡された関数は,
`setTimeout`関数を呼び出してから1病後に呼び出されます.

```js
() => setCounter(counter + 1)
```

状態変更関数`setTimeout`が呼び出されると, Reactはコンポーネントを再レンダリングします.
つまり, コンポーネント関数の関数本体が再実行します.

```js
(props) => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}
```

コンポーネント関数が2回目に実行されると, `useState`関数を呼び出し, 状態の新しい値である1を返します.
関数本体を再度実行すると, `setTimeout`への新しい関数呼び出しも行われ,
1秒のタイムアウトが実行され, `counter`の状態が再びインクリメントされます.
変数`counter`の値は1であるため, 値を1だけインクリメントすることは, カウンタの値を2に設定する式と本質的に同じです.

```js
() => setCounter(2)
```

その間, `counter`の古い値"1"が画面に表示されます.

`setCounter`が状態を更新するたびに, コンポーネントが再レンダリングされます.
`state`の値は1秒後に再びレンダリングされ, アプリケーションが実行されている限り繰り返されます.

コンポーネントが思うようにレンダリングされなかったり, 間違ったタイミングでレンダリングされたりした場合,
コンポーネントの変数の値をコンソールにロギングすることで, アプリケーションをデバッグすることができます.
コードに以下のように追記します.

```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  console.log('rendering...', counter)

  return (
    <div>{counter}</div>
  )
}
```

`render`関数への呼び出しを追跡することは簡単です.

<img src="https://fullstackopen.com/static/eb93a613b875efbcb9e28207f96593f5/14be6/4e.png">

## Event handling
特定のイベントが発生したときに呼び出されるように登録されているイベントハンドラについては,
Part0 ですでに数回述べています.
例えば, ユーザがWebページの様々な要素を操作することで, 様々な異なる種類のイベントのコレクションがトリガーされます.

アプリケーションに変更を加えて, ユーザが`button`要素で実装されているボタンをクリックしたときに`counter`が増加するようにしましょう.

ボタン要素はいわゆるマウスイベントをサポートしていますが, その中でもクリックが最も一般的なイベントです.

Reactでは, クリックイベントへのイベントハンドラ関数の登録は次のようになります.

```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>
        plus
      </button>
    </div>
  )
}
```

ボタンの`onClick`属性の値を, コードで定義されている`handleClick`関数への参照に設定します.

これで, `plus`ボタンがクリックされるたびに, `handleClick`関数が呼び出されます.
つまり, すべてのクリックイベントは, `clicked`というメッセージをブラウザコンソールに出力します.

イベントハンドラ関数は, `onClick`属性の値への代入で直接定義することもできます.

```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => console.log('clicked')}>
        plus
      </button>
    </div>
  )
}
```

イベントハンドラを次の形式に変更しましょう.

```js
<button onClick={() => setCounter(counter + 1)}>
  plus
</button>
```

目的の動作を実装します.
つまり, `counter`の値が1つ増加するたびにコンポーネントが再レンダリングされるようにします.

カウンターをリセットするためのボタンも追加しましょう.

```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
      <button onClick={() => setCounter(0)}>
        zero
      </button>
    </div>
  )
}
```

これでアプリケーションが完成しました！！


## Event handler is function
`onClick`属性を宣言するボタンのイベントハンドラを定義します.

```js
<button onClick={() => setCounter(counter + 1)}>
  plus
</button>
```

イベントハンドラをより簡単な形式で定義しようとするとどうなるでしょうか？

```js
<button onClick={setCounter(counter + 1)}>
  plus
</button>
```

これでは, アプリケーションが完全に壊れてしまします.

<img src="https://fullstackopen.com/static/0011b60326c4e1b1c31563fb252723f4/14be6/5b.png">

どうなっているのでしょうか？
イベントハンドラは関数か関数参照のどちらかであることになっていますが, このように記述すると

```js
<button onClick={setCounter(counter + 1)}>
```

イベントハンドラは実際には関数呼び出しです.
多くの状況でこれは問題ありませんが, この特定の状況ではそうではありません.
最初は, `counter`変数の値は0です.
Reactがメソッドを初めてレンダリングするときに, 関数呼び出し`setCounter(0 + 1)`を実行し,
コンポーネントの状態の値を1に変更します.
これにより, コンポーネントが再レンダリングされ, reactは再び`setCounter`関数呼び出しを実行し,
状態が変化して再レンダリングが行われます....

以前と同じようにイベントハンドラを定義しましょう.

```js
<button onClick={() => setCounter(counter + 1)}>
  plus
</button>
```

これで, ボタンがクリックされたときに何が起こるかを定義するボタンの属性`onClick`の値は `() => setCounter(counter + 1)`になります.
`setCounter`関数は, ユーザがボタンをクリックしたときにのみ呼び出されます.

通常, JSXテンプレート内でイベントハンドラを定義することはお勧めできません.
ここでは, イベントハンドラはとても単純なので問題ありません.

とにかく, イベントハンドラ関数を個別の関数に分離しましょう.

```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)

  const setToZero = () => setCounter(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>
        plus
      </button>
      <button onClick={setToZero}>
        zero
      </button>
    </div>
  )
}
```

ここでは, イベントハンドラ関数が正しく定義されています.
`onClick`属性の値は, 関数参照を含む変数です.

```js
<button onClick={increaseByOne}>
  plus
</button>
```

## Passing state to child components
小さく, アプリケーション全体, さらにはプロジェクト全体で再利用可能なReactコンポーネントを作成することをおすすめします.
アプリケーションをリファクタリングして, カウンタを表示する1つのコンポーネントと2つのボタンコンポーネントの
3つの小さなコンポーネントで構成しましょう.

まず, カウンターの値を表示する`Display`コンポーネントを実装しましょう.

Reactのベストプラクティスの1つは, コンポーネント階層の中で状態を上位階層に引き上げることです.
ドキュメントではこう述べられています.

  多くの場合, 複数のコンポーネントが同じ変化するデータを反映する必要があります.
  共通の状態を最も近い共通の親まで引き上げておくことをお勧めします.

それでは, アプリケーションの状態を`App`コンポーネントに配置し, `props`を介して`Display`コンポーネントに渡しましょう.

```js
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}
```

カウンターの状態をコンポーネントに渡すだけでよいので, コンポーネントの使用は簡単です.

```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>
      <button onClick={increaseByOne}>
        plus
      </button>
      <button onClick={setToZero}>
        zero
      </button>
    </div>
  )
}
```

すべてはまだ動作しています.
ボタンがクリックされて`App`コンポーネントが再レンダリングされると, `Display`コンポーネントを含む全ての子コンポーネントも
再レンダリングされます.

次に, アプリケーションのボタンの部分である`Button`コンポーネントを作成しましょう.
イベントハンドラとボタンのタイトルをコンポーネントの`props`として渡さなければなりません.

```js
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
```

`App`コンポーネントは次のようになります.

簡単に再利用できる`Button`コンポーネントができたので, カウンターをデクリメントするために使用できるボタンを追加することで,
アプリケーションに新しい機能を実装しました.

イベントハンドラは`handleClick`プロップを通して`Button`コンポーネントに渡されます.
`prop`の名前自体はそれほど重要ではありませんが, 名前の選択は完全にランダムというわけではありませんでした.
