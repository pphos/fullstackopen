## 1.4: course information step4
オブジェクトを配列に内に置きましょう.
`App`の変数定義を以下のような形に修正し, それに合わせて他の部分も修正しましょう.

```js
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      ...
    </div>
  )
}
```

<em>注意</em>: この時点では, 常に3つのアイテムがあると想定しているので, ループを使用して配列を処理する必要はありません.
配列内のアイテムに基づいたコンポーネントのレンダリングについては, コースの次のパートで詳しく説明します.

ただし, 異なるオブジェクトを`App`コンポーネントから`Content`および`Total`コンポーネントに個別の`props`として渡さないでください.
代わりに, それらを配列として直接渡してください.

```js
const App = () => {
  // const definitions

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}
```
