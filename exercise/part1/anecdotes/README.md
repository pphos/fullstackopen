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
