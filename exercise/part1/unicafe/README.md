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