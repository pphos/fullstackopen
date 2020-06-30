### 1.6: unicafe step1
多くの企業と同様に, Unicafeは顧客からフィードバックを収集します.
あなたのタスクは, 顧客のフィードバックを収集するためのWebアプリケーションを実装することです.
フィードバックには, good, neutral, badの3つのオプションしかありません.

アプリケーションは, カテゴリ毎に収集されたフィードバックの総数を表示する必要があります.
最終的なアプリケーションは次のようになります.

<img src="https://fullstackopen.com/static/d4fe767d6d8eb46f1dd21334f5f9e46e/14be6/13e.png">

アプリケーションは, 単一のブラウザセッション中にのみ動作する必要があることに注意してください.
ページを更新すると, 収集されたフィードバックは表示されなくなります.

アプリケーションは, 単一の`index.js`ファイルに実装できます.
以下のコードをアプリケーションの出発点として使用できます.

```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      code here
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
```

### 1.7: unicafe step2
アプリケーションを拡張して, 収集されたフィードバックに関するより多くの統計を表示しましょう.
収集されたフィードバックの合計数, 平均スコア (good: 1, neutral: 0, bad: -1), およびポジティブフィードバックの割合です.

<img src="https://fullstackopen.com/static/0a5d15ae9f055a15cb469b9c9223df41/14be6/14e.png">

### 1.8: unicafe step3
統計の表示が独立した`Statistics`コンポーネントに抽出されるように, アプリケーションをリファクタリングしましょう.
アプリケーションのstateは, `App`のルートコンポーネントに残る必要があります.

コンポーネントは他のコンポーネントの内部で定義してはならないことに注意してください.

```js
// a proper place to define a component
const Statistics = (props) => {
  // ...
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // do not define a component within another component
  const Statistics = (props) => {
    // ...
  }

  return (
    // ...
  )
}
```

### 1.9: unicafe step4
フィードバックが収集された後にのみ統計を表示するようにアプリケーションを変更しましょう.

<img src="https://fullstackopen.com/static/b453d7533ae85dcaf3eccf342a353c58/14be6/15e.png">

### 1.10: unicafe step5
アプリケーションのリファクタリングを続けましょう.
次の2うのコンポーネントを抽出しましょう.

- フィードバックの送信に使用されるボタンを定義するための`Button`コンポーネント
- 平均スコアのような単一の統計を表示するための`Statistic`コンポーネント

明白にしておきましょう: `Statistic`コンポーネントは常に1つ統計量を表示し,
アプリケーションはすべての統計量を表示するために複数のコンポーネントを使用します.

```js
const Statistics = (props) => {
  /// ...
  return(
    <div>
      <Statistic text="good" value ={...} />
      <Statistic text="neutral" value ={...} />
      <Statistic text="bad" value ={...} />
      // ...
    </div>
  )
}
```

アプリケーションのstateは引き続き, ルートである`App`コンポーネントに保持する必要があります.

### 1.11*: unicafe step6
統計をHTMLの`table`を用いて表示すると, アプリケーションはだいたい次のようになります.

<img src="https://fullstackopen.com/static/a74acccc17aafb02b3801ffa1fcc0fdc/14be6/16e.png">

常にコンソールを開いたままにしておいてください.
コンソールに次のような警告が表示された場合,

<img src="https://fullstackopen.com/static/d6f948307449c2673f28f1077ef4d789/14be6/17a.png">

次に, 警告を消すために必要なアクションを実行しましょう.
行き詰まった場合は, エラーメッセージをグーグルで検索しましょう.

典型的なエラーの発生源: `Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.`はChrome拡張です.
`chrome://extensions/`に移動して, 1つずつ無効化してReactアプリケーションのページを更新してみてください.
エラーは最終的には消えます.

今度, コンソール警告が表示されないことを確認してください.