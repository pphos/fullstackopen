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
