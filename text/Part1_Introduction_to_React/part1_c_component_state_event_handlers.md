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

## 分割代入
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

