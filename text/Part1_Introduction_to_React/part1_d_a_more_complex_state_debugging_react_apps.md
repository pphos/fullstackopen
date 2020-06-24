# A more complex state, debugging React apps

## Complex state
以前の例のアプリケーションでは, アプリケーションの状態は単一の整数で構成されていたため, 単純でした.
アプリケーションがもっと複雑な状態を必要とする場合はどうしましょうか？

ほとんどの場合, これを実現する最も簡単で最良の方法は, `useState`関数を複数回使用して,
別々のピースを作成することです.

次のコードでは, `left`および`right`という名前を持つ, 初期値0のアプリケーションの状態を持つピースを作成しています.

```js
const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  return (
    <div>
      <div>
        {left}
        <button onClick={() => setLeft(left + 1)}>
          left
        </button>
        <button onClick={() => setRight(right + 1)}>
          right
        </button>
        {right}
      </div>
    </div>
  )
}
```

コンポーネントは, 状態の2つの部分を更新するために使用できる関数である`setLeft`と`setRight`へのアクセスを取得します.

コンポーネントの状態および状態の一部は, 任意の型にすることができます.
`left`ボタンと`right`ボタンの両方のクリック数を一つのオブジェクトに保存することで, 同じ機能が実装できます.

```js
{
  left: 0,
  right: 0
}
```

この場合, アプリケーションは次のようになります.

```js
const App = (props) => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    const newClicks = {
      left: clicks.left + 1,
      right: clicks.right
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = {
      left: clicks.left,
      right: clicks.right + 1
    }
    setClicks(newClicks)
  }

  return (
    <div>
      <div>
        {clicks.left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {clicks.right}
      </div>
    </div>
  )
}
```

これで, コンポーネントの状態は単一のピースのみとなり,
イベントハンドラはアプリケーション全体の状態を変更する必要がなくなりました.

イベントハンドラは少し乱雑に見えます.
`left`ボタンがクリックされると, 次の関数が呼び出されます.

```js
const handleLeftClick = () => {
  const newClicks = {
    left: clicks.left + 1,
    right: clicks.right
  }
  setClicks(newClicks)
}
```

上記のイベントハンドラでは, 次のオブジェクトがアプリケーションの新しい状態として設定されます.

```js
{
  left: clicks.left + 1,
  right: clicks.right
}
```

これで, `left`プロパティの新しい値は前の状態の`left + 1`の値と同じになり,
`right`プロパティの値は前の状態の`right`プロパティの値と同じになります.

2018年夏に言語仕様に追加されたオブジェクトスプレッド構文を使用して,
新しい状態オブジェクトをもう少しきれいに定義できます.

```js
const handleLeftClick = () => {
  const newClicks = {
    ...clicks,
    left: clicks.left + 1
  }
  setClicks(newClicks)
}

const handleRightClick = () => {
  const newClicks = {
    ...clicks,
    right: clicks.right + 1
  }
  setClicks(newClicks)
}
```

この構文は最初は少し奇妙に見えるかもしれません.
実際には, `{ ...clicks }`は, `clicks`オブジェクトのすべてのプロパティのコピーを持つ新しいオブジェクトを作成します.
特定のプロパティ, 例えば`{ ...clicks, right: 1 }`で`right`を指定すると,
新しいオブジェクトの`right`プロパティの値は1になります.

上記の例では, これは

```js
{ ...clicks, right: clicks.right + 1 }
```

`right`プロパティの値が1増加した`clicks`オブジェクトのコピーを作成します.

イベントハンドラでオブジェクトを変数に割り当てる必要はなく,
関数を次の形式に簡略化できます.

```js
const handleLeftClick = () =>
  setClicks({ ...clicks, left: clicks.left + 1 })

const handleRightClick = () =>
  setClicks({ ...clicks, right: clicks.right + 1 })
```

一部の読者は, 次のように, なぜ状態を直接更新しなかったのかと疑問に思うかもしれません.

```js
const handleLeftClick = () => {
  clicks.left++
  setClicks(clicks)
}
```

これでもアプリケーションは動作するように思われます.
ただし, 予期しない副作用が発生する可能性があるため, Reactでは状態を直接更新することは禁止されています.
状態ほ変更するには, 常に状態を新しいオブジェクトに設定する必要があります.
前の状態オブジェクトからプロパティを変更しない場合は, それらを単にコピーする必要があります.
これは, それらのプロパティを新しいオブジェクトにコピーし, それを新しい状態に設定することにより行われます.

全ての状態を単一の状態のオブジェクトに格納することは, この特定のアプリケーションにとっては悪い選択です.
明白な利点はなく, 結果のアプリケーションは非常に複雑になります.
この場合, クリックカウンターを別々の状態に保存するほうがはるかに適しています.

アプリケーションの状態の一部をより複雑なデータ構造に格納することが有益な場合があります.
<a href="https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables">Reactの公式ドキュメント</a>には, このトピックに役立つガイダンスが含まれています.


