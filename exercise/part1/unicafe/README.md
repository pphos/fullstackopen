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
