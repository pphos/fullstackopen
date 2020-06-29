## 1.1: course infromation, step 1
この演習で取り組むアプリケーションは, 今後の演習でさらに利用されます.
このコースおよびこれ以降のコースの演習では, 最終型のアプリケーションを提出するだけで十分です.
必要に応じて, 演習ごとにコミットを作成することもできます.

`create-react-app`を使用して, 新しいアプリケーションを作成してください.
そして, `index.js`を次のように変更してください.

```js
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

その後, 余分な`App.js`, `App.css`, `App.test.js`, `logo.svg`, `setupTests.js`, `serviceWorker.js`のファイルを削除してください.

残念なことに, アプリケーション全体が同じコンポーネントの中にあります.
`Header`, `Content`, `Total`の3つの新しいコードで構成されるようにコードをリファクタリングしてください.
全てのデータはいまだ`App`コンポーネント内にあり, 必要なデータを`props`を用いて各コンポーネントに渡します.
`Header`はコース名のレンダリングを担当し, `Content`はパートとその演習数をレンダリングし,
`Total`は演習の総数をレンダリングします.

`App`コンポーネントの中身は, おおよそ次のようになります.

```js
const App = () => {
  // const-definitions

  return (
    <div>
      <Header course={course} />
      <Content ... />
      <Total ... />
    </div>
  )
}
```

<em>警告</em>: `create-react-app`は, 既存のリポジトリ内にアプリケーションが作成されない限り,
プロジェクトを自動的にgitリポジトリにします.
ほとんどの場合, プロジェクトをリポジトリにしたくないので, プロジェクトのルートで`rm -rf .git`コマンドを実行してください.
