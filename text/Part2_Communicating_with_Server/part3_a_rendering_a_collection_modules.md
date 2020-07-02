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
