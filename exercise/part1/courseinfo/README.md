## 1.5: course information step5
変更をさらに一歩進めましょう.
`course`とその`parts`を1つのJavaScriptオブジェクトに変更しましょう.
壊れているものはすべて修正しましょう.

```js
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      ...
    </div>
  )
}
```
