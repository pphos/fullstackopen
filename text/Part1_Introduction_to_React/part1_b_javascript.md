# JavaScript
このコースでは, Web開発に加えて十分にJavaScriptを学習することを目標としています.

JavaScriptはここ数年で急速に進化しており, このコースでは新しいバージョンの機能を使用します.
JavaScriptの標準規格の正式名称はECMAScriptです.
現時点では, 2019年6月にリリースされたものが最新版で, ECMAScript® 2019, 別称ES10と呼ばれています.

ブラウザはまだJavaSriptの最新機能の全てをサポートしているわけではありません.
このため, ブラウザで実行されるコードの多くは,
JavaScriptの新しいバージョンから互換性がある古いバージョンに変換されています.

現在では, Babelを使ってトランスパイリングを行う方法が主流となっています.
トランスパイルは, `create-react-app`で作成したReactアプリケーションで自動的に行われます.
Part7では, トランスパイルの構成について詳しく見ていきます.

Node.jsは, GoogleのChrome V8 JavaScriptエンジンに基づくJavaScriptランタイム環境であり,
サーバーからスマートフォンまで, 事実上どこでも機能します.
Node.jsを使ってJavaScriptを書いてみましょう.
インストールされているNode.jsのバージョンは, 少なくとも10.18.0であることが望ましいです.
Nodeの最新バージョンはすでにJavaScriptの最新バージョンをカバーしているので, コードをトランスパイルする必要はありません.

コードは`.js`で終わるファイルに書き込まれ, `node name_of_file.js`コマンドにより実行されます.

コマンドラインで`node`と入力して開くNode.jsコンソールや, ブラウザのデベロッパーツールのコンソールにJavaScriptのコードを書き込むことができます.

Chromeの最新リビジョンでは, コードをトランスパイルしなくてもJavaScriptの新機能を非常にうまく扱うことができます.
<a href="https://jsbin.com/?js,console">JS Bin</a>のようなツールを使用することもできます.

JavaScriptは名前もシンタックスもJavaを彷彿とさせます.
言語の中核となるメカニズムに関しては, これ以上の違いはありません.
Javaの背景からやってきたJavaScriptの挙動は, 特に機能について調べようとしない場合は, 少し異質に見えるかもしれません.

特定の分野では, JavaScriptでJavaの機能とデザインパターンを「シミュレート」することも人気があります.
言語とそれぞれのエコシステムは最終的には非常に異なるため, シミュレートを行うことがおすすめしません.

## 変数
JavaScriptでは, 変数を定義する方法がいくつかあります.

```js
const x = 1
let y = 5

console.log(x, y)   // 1, 5 are printed
y += 10
console.log(x, y)   // 1, 15 are printed
y = 'sometext'
console.log(x, y)   // 1, sometext are printed
x = 4               // causes an error
```

`const`は実際には変数を定義するものではなく, 値を変更することができない定数を定義します.
一方, `let`は通常の変数を定義します.

上記の例では, 変数に代入されるデータ型が実行中に変化していることが分かります.
`y`はプログラム開始時には整数を格納し, 終了時には文字列を格納しています.

また, `var`キーワードを使用してJavaScriptで変数を定義することもできます.
`var`は長い間, 変数を定義する唯一の方法でした.
`const`と`let`はES6で追加されたばかりです.
特定の状況では, `var`はほとんどの言語の変数定義とは異なる方法で動作します.
このコースでは, `var`の使用はおすすめできません.
代わりに`const`と`let`を使用してください.
このトピックの詳細についてはYouTubeで見ることができます.
-<a href="https://youtu.be/sjyJBL5fkp8">var, let and const - ES6 JavaScript Features</a>

## 配列
以下は配列とその使用例です.

```js
const t = [1, -1, 3]

t.push(5)

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed

t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
})
```

上記の例で注目すべきところは, 配列が`const`として定義されているにもかかわらず,
配列の内容を変更できるという事実です.
配列はオブジェクトであるので, 変数は常に同じオブジェクトを指しています.
しかし, 新しいアイテムが追加されると, 配列の内容は変化します.

配列のアイテムを反復処理する1つの方法は, `forEach`を使用することです.
`forEach`は, アロー構文を使用して定義された関数をパラメータとして受け取ります.

```js
value => {
  console.log(value)
}
```

`forEach`は, 配列内の各項目の関数を呼び出し, 常に個々のアイテムをパラメータとして渡します.
`forEach`のパラメータとしての関数は, 他のパラメータを受けることもできます.

前回の例では, `push`メソッドを使用して新しいアイテムが配列に追加されました.
Reactを使用する場合, 関数型プログラミングの手法がよく使用されます.
関数型プログラミングパラダイムの特徴の1つは, 不変のデータ構造を使用することです.
Reactのコードでは, `concat`メソッドを使用することをおすすめします.
これは, アイテムを配列に追加せずに, 古い配列の内容と新しいアイテムの両方が含まれる新しい配列を生成します.

```js
const t = [1, -1, 3]

const t2 = t.concat(5)

console.log(t)  // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed
```

`t.concat(5)`のメソッド呼び出しは, 古い配列に新しいアイテムを追加しませんが,
古い配列のアイテムを含むだけでなく, 新しいアイテムも含む新しい配列を返します.

配列に対して定義された便利なメソッドがたくさんあります.
`map`目ドッドを使用する短いサンプルを見てみましょう.

```js
const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed
```

古い配列に基づいて, `map`は新しい配列を作成し, パラメータとして与えられた関数を使用してアイテムを作成します.
この例では, 元の値を2倍しています.

`map`は配列を完全に異なるものに変換することもできます.

```js
const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed
```

ここでは, 整数値で埋め尽くされた配列を`map`メソッドを使ってHTMLの文字列を含む配列に変換しています.
このコースのパート2では, Reactで`map`を非常に頻繁に使用されているところが見られます.

配列の個々のアイテムは, 分割代入を使用して変数に簡単に代入できます.

```js
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1, 2 is printed
console.log(rest)          // [3, 4 ,5] is printed
```
分割代入のおかげで, `first`と`second`の変数は配列の最初の2つの整数を値として受け取ります.
残りの整数は, 独自の配列に集められて, `rest`変数に代入されます.

## オブジェクト
JavaScriptでオブジェクトを定義する方法はいくつかあります.
非常に一般的なオブジェクトの定義法の一つは, オブジェクトリテラルを使用であり,
プロパティを中括弧内に並べることにより実現されます.

```js
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}

const object2 = {
  name: 'Full Stack web application development',
  level: 'intermediate studies',
  size: 5,
}

const object3 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
}
```

プロパティの値は, 整数, 文字列, 配列, オブジェクトなど, 任意の型をしているすることができます.

オブジェクトのプロパティは, ドット記法を使用するか, カッコを使用して参照されます.

```js
console.log(object1.name)         // Arto Hellas is printed
const fieldName = 'age'
console.log(object1[fieldName])    // 35 is printed
```

ドット記法やカッコを使用して, オブジェクトにプロパティを追加することもできます.

```js
object1.address = 'Helsinki'
object1['secret number'] = 12341
```

ドット記法を使用する場合, `secret number`はスペース文字があるため有効なプロパティ名ではないため,
後者のプロパティの追加はカッコを使用して行う必要があります.

当然のことながら, JavaScriptのオブジェクトにはメソッドを含めることもできます.
ただし, このコースでは, 独自のメソッドを使用してオブジェクトを定義する必要がありません.
そのため, このコースでは簡単にしか説明しません.

オブジェクトは, いわゆるコンストラクタ関数を使用して定義することもでき,
その結果, Javaのクラスなど, 他の多くのプログラミング言語を彷彿とさせるメカニズムになります.
このような類似性があるにもかかわらず, JavaScriptにはオブジェクト指向プログラミング言語のような意味でのクラスはありません.
しかし, ES6からクラス構文が追加され, オブジェクト指向クラスの構造化に役立つ場合があります.


## 関数
アロー関数については, すでに紹介しました.
省略をせずに, アロー関数を定義するまでの完全な流れは以下の通りです.

```js
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}
```

関数は以下のコードで期待通りに呼び出されます.

```js
const result = sum(1, 5)
console.log(result)
```

パラメータが1つだけの場合は, 定義からカッコを省くことができます.

```js
const square = p => {
  console.log(p)
  return p * p
}
```

関数が単一の式のみを含む場合は, 中括弧は必要ありません.
この場合, 関数は式の結果のみを返します.
コンソール表示のコード削除すると, 関数定義をさらに短くすることができます.

```js
const square = p => p * p
```

この形式は, `map`メソッドなどで配列を操作するときに特に便利です.

```js
const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
// tSquared is now [1, 4, 9]
```

アロー関数は, わずか数年前にES6でJavaScriptに追加されました.
ES6以前は, 関数を定義する唯一の方法は, `function`キーワードを使用することでした.

関数を定義する方法は２つあります.
1つは関数宣言で名前をつけることです.

```js
function product(a, b) {
  return a * b
}

const result = product(2, 6)
// result is now 12
```

関数を定義するもう一つの方法は, 関数式を使用することです.
この場合, 関数に名前をつける必要はなく, 定義はコードの残りの部分にずっと存在します.

```js
const average = function(a, b) {
  return (a + b) / 2
}

const result = average(2, 5)
// result is now 3.5
```

このコースでは, アロー構文を使用して全ての関数を定義します.

## Exercises 1.3. -1.5.
前回の演習で取り組んだアプリケーションの構築を続けます.
提出されたアプリケーションの最終的な状態のみに関心があるため,
同じプロジェクトにコードを書き込むことができます.

<em>Pro-tip</em>コンポーネントが受け取る`props`の構造に問題が発生する場合があります.
物事をより明確にする良い方法は, 次のように, `props`をコンソールに表示することです.

```js
const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}
```

## 1.3: course information step3
アプリケーションでオブジェクトを使用しましょう.
`App`コンポーネントの変数定義を次のように変更し,
アプリケーションが引き続き動作するようにリファクタリングします.

```js
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      ...
    </div>
  )
}
```

## 1.4: course information step4
オブジェクトを配列に内に置きましょう.
`App`の変数定義を以下のような形に修正し, それに合わせて他の部分も修正しましょう.

```js
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      ...
    </div>
  )
}
```

<em>注意</em>: この時点では, 常に3つのアイテムがあると想定しているので, ループを使用して配列を処理する必要はありません.
配列内のアイテムに基づいたコンポーネントのレンダリングについては, コースの次のパートで詳しく説明します.

ただし, 異なるオブジェクトを`App`コンポーネントから`Content`および`Total`コンポーネントに個別の`props`として渡さないでください.
代わりに, それらを配列として直接渡してください.

```js
const App = () => {
  // const definitions

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}
```

## 1.5: course information step5
変更をさらに一歩進めましょう.
`course`とその`parts`を1つのJavaScriptオブジェクトに変更しましょう.
壊れているものはすべて修正しましょう.

```js
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      ...
    </div>
  )
}
```

## オブジェクトメソッドとthis
このコースではReact hooksを含むReactのバージョンを使用しているために, オブジェクトメソッドを定義する必要はありません.
<em>この章の内容はコースには関係ありません</em>が, 多くの意味で知っておくと良いことは確かです.
特にhooks以前のReactを使う場合は, この章のトピックを理解しておく必要があります.

アロー感および`function`キーワードをを用いて定義された関数は,
オブジェクト時代を指すキーワード`this`に対する挙動が大きく異なります.

関数であるプロパティを定義することで, オブジェクトにメソッドを割り当てることができます.

```js
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}

arto.greet()  // "hello, my name is Arto Hellas" gets printed
```

オブジェクト作成後でも, メソッドをオブジェクトに割り当てることができます.

```js
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}

arto.growOlder = function() {
  this.age += 1
}

console.log(arto.age)   // 35 is printed
arto.growOlder()
console.log(arto.age)   // 36 is printed
```

オブジェクトを少し変更してみましょう.

```js
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
  doAddition: function(a, b) {
    console.log(a + b)
  },
}

arto.doAddition(1, 4)        // 5 is printed

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)   // 25 is printed
```

オブジェクトには, パラメータとして与えられた数値の合計を計算する`doAddition`メソッドがあります.
メソッドは通常の方法で呼び出され, `arto.doAddition(1, 4)`を使用するか,
メソッドの参照を変数に格納し, `referenceToAddition(10, 15)`の変数を介して呼び出します.

`greet`メソッドで同じことを行おうとすると, 問題が生じます.

```js
arto.greet()       // "hello, my name is Arto Hellas" gets printed

const referenceToGreet = arto.greet
referenceToGreet() // prints "hello, my name is undefined"
```

参照を介してメソッドを呼び出すと, メソッドは元の`this`が何であったかを認識できなくなります.
他の言語とは異なり, JavaScriptでは, `this`の値はメソッドの呼び出し方法に基づいて定義されます.
参照を介してメソッドを呼び出すと, `this`の値はいわゆるグローバルオブジェクトになり,
最終的な結果はソフトウェア開発者が本来意図していたものとは異なることがよくあります.

JavaScriptのコードを作成するときに`this`を認識できないと, 潜在的な問題が発生します.
多くの場合, ReactまたはNode (より具体的にはWebブラウザのJavaScriptエンジン)が,
開発者が定義したオブジェクト内のメソッドを呼び出す必要がある状況が発生します.
しかし, このコースでは, "this-less"なJavaScriptを使用することで, これらの問題を回避しています.

`this`の消失につながる一つの状況は, `setTimeout`関数を使用して
`arto`オブジェクトの`greet`関数を呼び出すようにタイムアウトを設定したときに発生します.

```js
const arto = {
  name: 'Arto Hellas',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}

setTimeout(arto.greet, 1000)
```

前述したように, JavaScriptにおける`this`の値は, メソッドの呼び出し方法により定義されます.
`setTimeout`関数を呼び出しているとき, 実際にメソッドを呼び出すのはJavaScriptエンジンであり,
その時点で, `this`はグローバルオブジェクトを参照します.

元の`this`を保存するための方法はいくつかあります.
その一つが`bind`メソッドを使うことです.

```js
setTimeout(arto.greet.bind(arto), 1000)
```

`arto.greet.bind(arto)`を呼び出すと, メソッドがどこでどのように呼ばれているかに関係なく,
`this`が`Arto`を指すようにバインドされた新しい関数が作成されます.

アロー関数を使用することで, `this`に関連する問題のいくつかを解決することができます.
ただし, `this`が全く機能しないので, オブジェクトのメソッドとして使用すべきではありません.
`this`の挙動については,  後ほどアロー関数との関係で説明します.

JavaScriptで`this`がどのように動作するかをよりよく理解したい場合には,
インターネット上にはそのトピックについての資料がたくさんあります.
<a href="https://egghead.io/">egghead.io</a>による<a href="https://egghead.io/courses/understand-javascript-s-this-keyword-in-depth">Understand JavaScript's this Keyword in Depth</a>が非常におすすめです.

## クラス
以前に述べたように, JavaScriptにはオブジェクト指向プログラミング言語のようなクラスの仕組みはありません.
しかし, JavaScriptにはオブジェクト指向クラスのシミュレートを可能にする機能があります.

ES6でJavaScriptに導入されたクラス構文をざっと見てみましょう.
これにより, JavaScriptでのクラス (またはクラスのようなもの) 定義が大幅に簡略化されています.

次の例では, `Person`というクラスと2つの`Person`オブジェクトを定義しています.

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 35)
adam.greet()

const janja = new Person('Janja Garnbret', 22)
janja.greet()
```

構文に関していえば, クラスとクラスから作成されるオブジェクトはJavaのクラスとオブジェクトと非常によく似ています.
これらの振る舞いもJavaオブジェクトによく似ています.
コアな部分では, JavaScriptのプロトタイピング継承に基づいたオブジェクトであることに変わりありません.
JavaScriptは基本的に, `Boolean`, `Null`, `Undefined`, `Number`, `String`, `Symbol`, `Object`の型しか定義されていないので,
どちらのオブジェクトの型も実際には`Object`です.

クラス構文の導入は物議を醸しました.
詳細については<a href="https://github.com/petsel/not-awesome-es6-classes">Not Awesome:ES6 Classes</a>や
<a href="https://medium.com/@rajaraodv/is-class-in-es6-the-new-bad-part-6c4e6fe1ee65">Is "Class" In ES6 The New "Bad" Part?</a>を確認してみてください.

ES6のクラス構文は古いバージョンのReactとNode.jsでよく使用されているため, このコースでも理解しておくことは有益です.
このコースではReactの新しいhooksの機能を使用しているため, JavaScriptのクラス構文を具体的に使用することはありません.

## JavaScriptの資料