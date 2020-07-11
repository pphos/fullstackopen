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
