### 1.12*: anecdotes step1
ソフトウェア工学の世界は, 時代を超えた真実を私達の分野から短いワンライナーに蒸留する<a href="http://www.comp.nus.edu.sg/~damithch/pages/SE-quotes.htm">逸話</a>で満ちています.

ソフトウェア工学の分野からランダムに逸話を表示するボタンをクリックすることで, 以下のアプリケーションを拡張しましょう.

```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {props.anecdotes[selected]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
```

GoogleがJavaScriptで乱数を生成する方法を教えてくれます.
ブラウザのコンソールで乱数の生成をテストすることができることを覚えておいてください.

完成したアプリケーションは次のようになります.

<img src="https://fullstackopen.com/static/8577fa00fc4d946e2322de9b2707c89c/14be6/18a.png">

警告: `create-react-app`は, 既存のgitリポジトリの中でアプリケーションを作成しない限り,
プロジェクトを自動的にgitリポジトリに変えてしまします.
たいていの場合, それぞれのプロジェクトを別々のリポジトリにしたくないので,
アプリケーションのルートで`rm -rf .git`コマンドを実行して.gitフォルダを削除しましょう.


### 1.13*: anecdotes step2
アプリケーションを拡張して, 表示された逸話に投票できるようにしましょう.

<img src="https://fullstackopen.com/static/06f95cb43a18bd6429174200a8d17cff/14be6/19a.png">

注意: 各逸話への投票を, コンポーネントのstateの配列またはオブジェクトに格納します.
オブジェクトや配列のような複雑なデータ構造に格納されたstateを更新する正しい方法は,
stateのコピーを作成することであることを覚えておいてください.

次のようにオブジェクトのコピーを作成できます.

```js
const points = { 0: 1, 1: 3, 2: 4, 3: 2 }

const copy = { ...points }
// increment the property 2 value by one
copy[2] += 1
```

または次のようにできます.

```js
const points = [1, 4, 6, 3]

const copy = [...points]
// increment the value in position 2 by one
copy[2] += 1
```

この場合, 配列を使う方が簡単な選択かもしれません.
ググッてみると, <a href="https://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length/22209781">このように</a>任意の長さの初期値0の配列を作るヒントがたくさんでききます.

## 1.14*: anecdotes step3
次に, 投票数が最大の逸話を表示するアプリケーションの最終バージョンを実装しましょう.

<img src="https://fullstackopen.com/static/3e8638efbbbbcabac7bb79466ab3a5f6/14be6/20a.png">

最初に複数の逸話が関連付けられている場合は, そのうちの1つを表示するだけで十分です.

これがこのパートの最後の演習でした.
今度はコードをGitHubにプッシュし, 終了したすべての演習を<a href="https://studies.cs.helsinki.fi/stats/courses/fullstackopen">提出システム</a>にマークしましょう.