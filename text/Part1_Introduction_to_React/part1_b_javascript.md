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



