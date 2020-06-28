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


## Handling arrays
アプリケーションで発生したすべてのクリックを記録する`allClicks`配列を含む状態のピースをアプリケーションに追加してみましょう.

```js
const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{allClicks.join(' ')}</p>
      </div>
    </div>
  )
}
```

すべてのクリックは, 空の配列として初期化される`allClicks`と呼ばれる個別の状態に保存されています.

```js
const [allClicks, setAll] = useState([])
```

`left`ボタンをクリックすると, 文字Lが`allClicks`配列に追加されます.

```js
const handleLeftClick = () => {
  setAll(allClicks.concat('L'))
  setLeft(left + 1)
}
```

`allClicks`に格納された状態のピースは, 以前の状態の配列の全てのアイテムと文字Lを含む配列に設定されます.
新しいアイテムを配列に追加するには, 既存の配列を変更せずに, アイテムが追加された配列の新しいコピーを返す`concat`メソッドを使用します.

前述のように, JavaScriptでは`push`メソッドを使用して配列にアイテムを追加することもできます.
アイテムを`allClicks`配列にプッシュして追加し, 状態を更新しても, アプリケーションは機能しているように見えます.

```js
const handleLeftClick = () => {
  allClicks.push('L')
  setAll(allClicks)
  setLeft(left + 1)
}
```

ただし, これはすべきことではありません.
前述したように, `allClicks`のようなReactコンポーネントのステートを直接変更してはいけません.
状態の変更がうまくいっているように見える場合もありますが, デバッグが非常に困難な問題を引き起こす可能性があります.

クリック履歴がページにどのようにレンダリングされるかを詳しく見てみましょう.

```js
const App = (props) => {
  // ...

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{allClicks.join(' ')}</p>
      </div>
    </div>
  )
}
```

`allClicks`配列に対して`join`メソッドを呼び出し, すべてのアイテムを空白で区切られた単一の文字列に結合することでレンダリングしています.


## Conditional rendering
クリック履歴のレンダリングが新しい`History`コンポーネントによって処理されるようにアプリケーションを変更してみましょう.

```js
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = (props) => {
  // ...

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}
```

コンポーネントの動作は, ボタンがクリックされたかどうかによって異なります.
ボタンが一回も押されていない場合, つまり配列`allClicks`が空である場合,
コンポーネントは代わりに案内を含む`div`要素をレンダリングします.

```js
<div>the app is used by pressing the buttons</div>
```

ボタンが一度でも押された場合には, コンポーネントがクリック履歴をレンダリングします.

```js
<div>
  button press history: {props.allClicks.join(' ')}
</div>
```

`History`コンポーネントは, アプリケーションの状態に応じて, 全く異なるReact要素をレンダリングし, これをconditional rendering (条件付きレンダリング)と呼びます.

Reactは, この他にも多くの条件付きレンダリングを行う方法を提供しています.
これについてはPart2で詳しくみていきます.

以前に定義した`Button`コンポーネントを使用するようにリファクタリングして,
アプリケーションに最後の変更を加えてみましょう.

```js
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}
```


## Old React
このコースでは, state hookをstateをReactコンポーネントに追加します.
これは, Reactの新しいバージョンの一部であり, バージョン16.8.0以降で使用できます.
hookが追加される前は, functionalコンポーネントにstateを追加する方法はありませんでした.
stateを必要とするコンポーネントは, JavaScriptのクラス構文を使用して, クラスコンポーネントとして定義する必要がありました.

このコースでは, Reactの将来のスタイルを確実に習得するために, 初回からもっぱらhooksのみを使用するという急進的な決断をしました.
functionalコンポーネントはReactの未来であるとはいえ, いつかは維持しなければならない古いReactコードが何十億行もあるので,
クラス構文を学ぶことは依然として重要です.
同じことが, インターネット上で偶然出くわす可能性があるReactのドキュメントとサンプルにも当てはまります.

コースの後半で, Reactのクラスコンポーネントについて詳しく学習します.


## Debuggin React applications
典型的な開発者の作業時間の大部分は, デバッグと既存のコードの読み書きに費やされます.
たまに新しいコードを書くこともありますが, 作業時間の大部分は, 何かが壊れている理由や, 何かがどのように動作するかを理解することに費やされます.
この理由から, デバッグのためのグッドプラクティスとツールは非常に重要です.

幸運なことに, デバッグに関しては, Reactは開発者にとって非常に使いやすいライブラリです.

次に進む前に, Web開発の最も重要なルールの一つを思い出してみましょう.

Web開発の最初のルール:

ブラウザのデベロッパーコンソールを常に開いたままにしておくこと.

特にConsoleタブは, 別のタブを表示する特別な理由がない限り, 常に開いている必要があります.

コードとWebページの両方を同時に開いたままにしておきます.

コードのコンパイルに失敗し, ブラウザがクリスマスツリーのように点灯する場合,

<img src="https://fullstackopen.com/static/ce4afeacf36ad991bc0eb0b095ea96b5/14be6/6e.png">

更にコードを書き足すのではなく, すぐに問題を見つけて修正してください.
コーディングの歴史の中で, コンパイルに失敗したコードが,
大量の追加コードを書いた後に奇跡的に動作するようになった瞬間はまだありません.
このコースでも, そのような出来事が起こるとは到底思えません.

昔ながらの, printベースのデバッグは常に良い考え方です.

```js
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
```

上記のコンポーネントが意図した通りに動作していない場合は, その変数をコンソールに出力し始めると便利です.
これを効果的に行うには, 関数をよりコンパクトな形式に変換し, `props`オブジェクト全体を即座に破壊することなく受け取る必要があります.

```js
const Button = (props) => {
  console.log(props)
  const { onClick, text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}
```

これにより, 例えば, コンポーネントの使用時に属性の1つにスペルミスがあったかどうかがすぐに分かります.

注: `console.log`をデバッグに使用する場合, 以下のように`+`演算子を使用してJavaのような方法でオブジェクトを結合しないでください.

```js
console.log('props value is ' + props)
```

代わりに, コンソールにログを記録したいものは次のようにカンマ(,)で区切ってください.

```js
console.log('props value is', props)
```

文字列とオブジェクトを連結するようなJavaのような方法を使用すると, 以下のように情報がないログメッセージが表示されます.

```js
props value is [Object object]
```

一方, カンマで区切られたアイテムはすべて, ブラウザコンソールで詳細に確認できます.

コンソールへのロギングは, アプリケーションをデバッグする唯一の方法ではありません.
コードの任意の場所に`debugger`コマンドを記述することにより,
Chromeデベロッパーコンソールのデバッガーでアプリケーションコードの実行を一時停止できます.

`debugger`コマンドが実行されるポイントに到達すると, アプリケーションの実行が一時停止されます.

<img src="https://fullstackopen.com/static/4a4bced189180676ff4019f459be833e/14be6/7a.png">

`Console`タブに移動すると, 変数の現在の状況を簡単に確認できます.

<img src="https://fullstackopen.com/static/5ba1388f4d17134dcfc62fbeb2251421/14be6/8a.png">

バグの原因が発見されたら, `debugger`コマンドを削除してページを更新できます.

デバッガーを使用すると, `Source`タブの右側にあるコントロールを使用して, コードを1行ずつ実行することもできます.

`Source`タブでブレークポイントを追加することにより, `debugger`コマンドを使用せずにデバッガーにアクセスすることもできます.
コンポーネントの変数の値の検査は, `Score`セクションで実行できます.

<img src="https://fullstackopen.com/static/c8c143bb940ecd99aea4dc4a1c0239f2/14be6/9a.png">

ChromeにReact開発者ツール拡張機能を追加することを強くお勧めします.
拡張機能を追加すると, 新しいReactタブが開発者ツールに追加されます.

<img src="https://fullstackopen.com/static/684b9b920cdd53d20129a4572ef9e209/14be6/10e.png">

新しいReact開発者ツールのタブを使用して, アプリケーションのさまざまなReact要素を, そのstateとpropsとともに検査できます.

残念ながら, React開発者ツールの現在のバージョンでは, hooksを用いて作成された
コンポーネントのstateを表示する際に不満な点が残っています.

<img src="https://fullstackopen.com/static/d106df75c6705400c7e0e8ac944f49c9/14be6/11e.png">

コンポーネントのstateは次のように定義されていました.

```js
const [left, setLeft] = useState(0)
const [right, setRight] = useState(0)
const [allClicks, setAll] = useState([])
```

開発者ツールは, 定義された順番でhooksのstateを表示します.

<img src="https://fullstackopen.com/static/d3e57c37a658ee67feec1e8368505e4b/14be6/11be.png">


## Rules of Hooks
アプリケーションがhooksベースの状態関数を正しく使用するためには, いくつかの制限とルールに従う必要がある.

`useState`関数 (およびコース後半で使用する`useEffect`関数) は, ループ, 条件式, またはコンポーネントを定義する関数ではない場所から呼び出されてはいけません.
hooksは常に同じ順番で呼び出される必要があり, もしそうでない場合には, アプリケーションの動作がおかしくなります.

要約すると, hooksは, Reactコンポーネントを定義する関数本体の内部からのみ呼び出すことができます.

```js
const App = (props) => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```


## Event Handling Revisited
イベント処理は, このコースの以前の反復では難しいテーマであることが分かっています.

このため, イベント処理のトピックを再度取り上げます.

以下の単純なアプリケーションを開発しているとしましょう.

ボタンをクリックして, 変数`value`に格納されている状態をリセットしましょう.

ボタンがクリックイベントに反応するようにするためには, ボタンにイベントハンドラを追加する必要があります.

イベントハンドラは常に関数または関数への参照である必要があります.
イベントハンドラがそれ以外のタイプの変数に格納されている場合, ボタンは機能しません.

イベントハンドラを以下のように文字列として定義した場合,

```js
<button onClick={'crap...'}>button</button>
```

Reactはコンソールで次のように警告を出します.

```js
index.js:2178 Warning: Expected `onClick` listener to be a function, instead got a value of `string` type.
    in button (at index.js:20)
    in div (at index.js:18)
    in App (at index.js:27)
```

また, 次のように記述したとしてもボタンは機能しません.

```js
<button onClick={value + 1}>button</button>
```

イベントハンドラに`value + 1`を設定しようとしましたが, これは単に操作の結果を返却するだけです.
Reactはこれについても親切に警告してくれます.

```js
index.js:2178 Warning: Expected `onClick` listener to be a function, instead got a value of `number` type.
```

更に, こういった記述をしてもボタンは機能しません.

```js
<button onClick={value = 0}>button</button>
```

このイベントハンドラは関数ではなく変数への代入であるため, Reactは再びコンソールに警告を表示します.
Reactで直接`state`を変更してはならないという意味でも, この書き方には問題があります.

以下についてはどうでしょうか？

```js
<button onClick={console.log('clicked the button')}>
  button
</button>
```

メッセージは一度コンソールに出力されますが, もう一度ボタンをクリックしても何も起こりません.
イベントハンドラに`console.log`関数が含まれている場合でも, これが機能しないのはなぜでしょうか？

ここでの問題は, イベントハンドラが関数呼び出しとして定義されていることです.
つまり, イベントハンドラには, 関数からの返り値が実際に割り当てられますが, `console.log`の場合は`undefined`です.

`console.log`関数呼び出しは, コンポーネントがレンダリングされるときに実行されるため, コンソールに一度は出力されます.

次の試みにも誤りがあります.

```js
<button onClick={setValue(0)}>button</button>
```

もう一度, 関数呼び出しをイベントハンドラに設定してみました.
これはうまく動作しません.
この特定の試みは別の問題を引き起こします.
コンポーネントがレンダリングされると関数`setValue(0)`が実行され,
その結果, コンポーネントが再レンダリングされます.
再レンダリングされると, 再び`setValue(0)`が呼び出され, 無限の再帰が発生します.

ボタンがクリックされたときに特定の関数呼び出しを実行するためには, 次のようにします.

```js
<button onClick={() => console.log('clicked the button')}>
  button
</button>
```

これでイベントハンドラはアロー関数構文 `() => console.log('clicked the button')`で定義された関数となります.
コンポーネントがレンダリングされると, 関数呼び出しでなく, アロー関数への参照のみがイベントハンドラに設定されます.
関数呼び出しは, ボタンがクリックされたときにのみ発生します.

これと同じ手法を使用して, アプリケーションに状態のリセットを実装できます.

```js
<button onClick={() => setValue(0)}>button</button>
```

これで, イベントハンドラは関数`() => setValue(0)`になります.

ボタンの属性でイベントハンドラを直接定義することは, 必ずしも最良の考え方ではありません.

イベントハンドラは別の場所で定義されていることが多いでしょう.
次のバージョンのアプリケーションでは, コンポーネント関数の本体にある, `handleClick`変数に割り当てられる関数を定義します.

```js
const App = (props) => {
  const [value, setValue] = useState(10)

  const handleClick = () =>
    console.log('clicked the button')

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  )
}
```

これで, `handleClick`変数が関数への参照に割り当てられました.
参照は`onClick`属性としてボタンに渡されます.

```js
<button onClick={handleClick}>button</button>
```

当然, イベントハンドラ関数は複数の文で構成できます.
これらのケースでは, アロー関数に中括弧を使用します.

```js
const App = (props) => {
  const [value, setValue] = useState(10)

  const handleClick = () => {
    console.log('clicked the button')
    setValue(0)
  }

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  )
}
```

## Function that returns a function
イベントハンドラを定義するもう一つの方法は, 関数を返す関数を使用することです.

このコースの演習では, 関数を返す関数を使用する必要はおそらくないでしょう.
特にこのトピックが混乱するように感じるのであれば, とりあえずこの項目を飛ばして, 後でまた戻ってきても問題ありません.

コードに次の変更を加えましょう.

```js
const App = (props) => {
  const [value, setValue] = useState(10)

  const hello = () => {
    const handler = () => console.log('hello world')
    return handler
  }

  return (
    <div>
      {value}
      <button onClick={hello()}>button</button>
    </div>
  )
}
```

以前に, イベントハンドラは関数呼び出しではなく, 関数または関数への参照である必要があると述べました.
この場合, なぜ関数呼び出しが機能するのでしょうか？

コンポーネントがレンダリングされると, 次の関数が実行されます.

```js
const hello = () => {
  const handler = () => console.log('hello world')

  return handler
}
```

関数の返り値は, `handler`変数に割り当てられた別の関数です.

Reactが次のコードをレンダリングするとき

```js
<button onClick={hello()}>button</button>
```

`hello()`の戻り値を`onClick`属性に割り当てます.
基本的に, 呼び出しは次のように変換されます.

```js
<button onClick={() => console.log('hello world')}>
  button
</button>
```

`hello`関数は関数を返すため, イベントハンドラは関数になりました.

このコンセプトのポイントは何でしょうか？

コードに少し変更を加えてみましょう.

```js
const App = (props) => {
  const [value, setValue] = useState(10)

  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }

  return (
    <div>
      {value}
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}
```

これで, アプリケーションにはパラメータを受け取る`hello`関数によって定義されたイベントハンドラを持つ3つのボタンがあります.

最初のボタンは次のように定義されています.

```js
<button onClick={hello('world')}>button</button>
```

イベントハンドラは, 関数呼び出し`hello('world')`を実行して作成されます.
関数呼び出しは関数を返します.

```js
() => {
  console.log('hello', 'world')
}
```

2番目のボタンは次のように定義されています.

```js
<button onClick={hello('react')}>button</button>
```

イベントハンドラを作成する関数呼び出し`hello('react')`は以下を返します.

```js
() => {
  console.log('hello', 'react')
}
```

どちらのボタンも独自の個別のイベントハンドラを取得します.

関数を返す関数は, パラメータでカスタマイズできる汎用機能の定義に利用できます.
イベントハンドラを作成する`hello`関数は, ユーザに挨拶するためにカスタマイズされた,
イベントハンドラを作成するファクトリーと考えることができます.

現在のコードの定義は少し冗長です.

```js
const hello = (who) => {
  const handler = () => {
    console.log('hello', who)
  }

  return handler
}
```

ヘルパー変数を削除して, 作成された関数を直接返しましょう.

```js
const hello = (who) => {
  return () => {
    console.log('hello', who)
  }
}
```

`hello`関数は単一の`return`文で構成されているので, 中括弧を省略して, アロー関数のよりコンパクトな構文を使用できます.

```js
const hello = (who) =>
  () => {
    console.log('hello', who)
  }
```

最後に, すべての矢印を同じ行に書きましょう.

```js
const hello = (who) => () => {
  console.log('hello', who)
}
```

同じトリックを使用して, コンポーネントの状態を特定の値に設定するイベントハンドラを定義できます.
コードに次の変更を加えましょう.

```js
const App = (props) => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => () => {
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}
```

コンポーネントがレンダリングされるとthousandボタンが生成されます.

```js
<button onClick={setToValue(1000)}>thousand</button>
```

イベントハンドラには, 以下の関数である`setToValue(100)`の戻り値が設定されています.

```js
() => {
  setValue(1000)
}
```

increaseボタンは次のように宣言されています.

```js
<button onClick={setToValue(value + 1)}>increment</button>
```

イベントハンドラは, パラメータとして変数`value`お現在の値を1だけ増加させたパラメータを受け取る,
`setToValue(value + 1)`という関数呼び出しによって作成されます.
もし`value`の値が10であれば, 作成されたイベントハンドラは次の関数になります.

```js
() => {
  setValue(11)
}
```

この機能を実現するために, 関数を返す関数を使用する必要はありません.
stateの更新を担う`setToValue`関数を通常の関数として表しましょう.

```js
const App = (props) => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>
        thousand
      </button>
      <button onClick={() => setToValue(0)}>
        reset
      </button>
      <button onClick={() => setToValue(value + 1)}>
        increment
      </button>
    </div>
  )
}
```

これで, イベントハンドラを, 適切なパラメータを使用して`setToValue`関数を呼び出す関数として定義できます.
アプリケーションの状態をリセットするためのイベントハンドラは次のようになります.

```js
<button onClick={() => setToValue(0)}>reset</button>
```

どちらのイベントハンドラの定義方法を選択するかは, ほとんどその人の好みの問題です.


## Passing Event Handlers to Child Components
ボタンを独自のコンポーネントに抽出してみましょう.

```js
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
```

コンポーネントは, `handleClick`のpropsからイベントハンドラ関数を取得し, ボタンのテキストを`text` propsから取得します.

`Button`コンポーネントの使用は簡単ですが, propsをコンポーネントに渡すときに正しい属性名を使用する必要があります.

<img src="https://fullstackopen.com/static/8ba6f921659bba13c9312f470007828e/14be6/12e.png">


## Do Not Define Components Within Components
アプリケーションの値を独自の`Display`コンポーネントに表示してみましょう.

`App`コンポーネント内に新しいコンポーネントを定義して, アプリケーションを変更してみます.

```js
ZH
arrow-up
Fullstack
part 1
A more complex state, debugging React apps
a Introduction to React
b JavaScript
c Component state, event handlers
d A more complex state, debugging React apps
Complex state
Handling arrays
Conditional rendering
Old React
Debugging React applications
Rules of Hooks
Event Handling Revisited
Function that returns a function
Passing Event Handlers to Child Components
Do Not Define Components Within Components
Useful Reading
Exercises 1.6.-1.14.
d

A more complex state, debugging React apps
Complex state
In our previous example the application state was simple as it was comprised of a single integer. What if our application requires a more complex state?

In most cases the easiest and best way to accomplish this is by using the useState function multiple times to create separate "pieces" of state.

In the following code we create two pieces of state for the application named left and right that both get the initial value of 0:

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
The component gets access to the functions setLeft and setRight that it can use to update the two pieces of state.

The component's state or a piece of its state can be of any type. We could implement the same functionality by saving the click count of both the left and right buttons into a single object:

{
  left: 0,
  right: 0
}
In this case the application would look like this:

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
Now the component only has a single piece of state and the event handlers have to take care of changing the entire application state.

The event handler looks a bit messy. When the left button is clicked, the following function is called:

const handleLeftClick = () => {
  const newClicks = {
    left: clicks.left + 1,
    right: clicks.right
  }
  setClicks(newClicks)
}
The following object is set as the new state of the application:

{
  left: clicks.left + 1,
  right: clicks.right
}
The new value of the left property is now the same as the value of left + 1 from the previous state, and the value of the right property is the same as value of the right property from the previous state.

We can define the new state object a bit more neatly by using the object spread syntax that was added to the language specification in the summer of 2018:

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
The syntax may seem a bit strange at first. In practice { ...clicks } creates a new object that has copies of all of the properties of the clicks object. When we specify a particular property - e.g. right in { ...clicks, right: 1 }, the value of the right property in the new object will be 1.

In the example above, this:

{ ...clicks, right: clicks.right + 1 }
creates a copy of the clicks object where the value of the right property is increased by one.

Assigning the object to a variable in the event handlers is not necessary and we can simplify the functions to the following form:

const handleLeftClick = () =>
  setClicks({ ...clicks, left: clicks.left + 1 })

const handleRightClick = () =>
  setClicks({ ...clicks, right: clicks.right + 1 })
Some readers might be wondering why we didn't just update the state directly, like this:

const handleLeftClick = () => {
  clicks.left++
  setClicks(clicks)
}
The application appears to work. However, it is forbidden in React to mutate state directly, since it can result in unexpected side effects. Changing state has to always be done by setting the state to a new object. If properties from the previous state object are not changed, they need to simply be copied, which is done by copying those properties into a new object, and setting that as the new state.

Storing all of the state in a single state object is a bad choice for this particular application; there's no apparent benefit and the resulting application is a lot more complex. In this case storing the click counters into separate pieces of state is a far more suitable choice.

There are situations where it can be beneficial to store a piece of application state in a more complex data structure.The official React documentation contains some helpful guidance on the topic.

Handling arrays
Let's add a piece of state to our application containing an array allClicks that remembers every click that has occurred in the application.

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{allClicks.join(' ')}</p>
      </div>
    </div>
  )
}
Every click is stored into a separate piece of state called allClicks that is initialized as an empty array:

const [allClicks, setAll] = useState([])
When the left button is clicked, we add the letter L to the allClicks array:

const handleLeftClick = () => {
  setAll(allClicks.concat('L'))
  setLeft(left + 1)
}
The piece of state stored in allClicks is now set to be an array that contains all of the items of the previous state array plus the letter L. Adding the new item to the array is accomplished with the concat method, that does not mutate the existing array but rather returns a new copy of the array with the item added to it.

As mentioned previously, it's also possible in JavaScript to add items to an array with the push method. If we add the item by pushing it to the allClicks array and then updating the state, the application would still appear to work:

const handleLeftClick = () => {
  allClicks.push('L')
  setAll(allClicks)
  setLeft(left + 1)
}
However, don't do this. As mentioned previously, the state of React components like allClicks must not be mutated directly. Even if mutating state appears to work in some cases, it can lead to problems that are very hard to debug.

Let's take a closer look at how the clicking history is rendered to the page:

const App = (props) => {
  // ...

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{allClicks.join(' ')}</p>
      </div>
    </div>
  )
}
We call the join method on the allClicks array that joins all the items into a single string, separated by the string passed as the function parameter, which in our case is an empty space.

Conditional rendering
Let's modify our application so that the rendering of the clicking history is handled by a new History component:

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = (props) => {
  // ...

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}
Now the behavior of the component depends on whether or not any buttons have been clicked. If not, meaning that the allClicks array is empty, the component renders a div element with some instructions instead:

<div>the app is used by pressing the buttons</div>
And in all other cases, the component renders the clicking history:

<div>
  button press history: {props.allClicks.join(' ')}
</div>
The History component renders completely different React elements depending on the state of the application. This is called conditional rendering.

React also offers many other ways of doing conditional rendering. We will take a closer look at this in part 2.

Let's make one last modification to our application by refactoring it to use the Button component that we defined earlier on:

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}
Old React
In this course we use the state hook to add state to our React components, which is part of the newer versions of React and is available from version 16.8.0 onwards. Before the addition of hooks, there was no way to add state to functional components. Components that required state had to be defined as class components, using the JavaScript class syntax.

In this course we have made the slightly radical decision to use hooks exclusively from day one, to ensure that we are learning the future style of React. Even though functional components are the future of React, it is still important to learn the class syntax, as there are billions of lines of old React code that you might end up maintaining some day. The same applies to documentation and examples of React that you may stumble across on the internet.

We will learn more about React class components later on in the course.

Debugging React applications
A large part of a typical developer's time is spent on debugging and reading existing code. Every now and then we do get to write a line or two of new code, but a large part of our time is spent on trying to figure out why something is broken or how something works. Good practices and tools for debugging are extremely important for this reason.

Lucky for us, React is an extremely developer-friendly library when it comes to debugging.

Before we move on, let us remind ourselves of one of the most important rules of web development.

The first rule of web development
Keep the browser's developer console open at all times.

The Console tab in particular should always be open, unless there is a specific reason to view another tab.

Keep both your code and the web page open together at the same time, all the time.

If and when your code fails to compile and your browser lights up like a Christmas tree:

fullstack content
don't write more code but rather find and fix the problem immediately. There has yet to be a moment in the history of coding where code that fails to compile would miraculously start working after writing large amounts of additional code. I highly doubt that such an event will transpire during this course either.

Old school, print-based debugging is always a good idea. If the component

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
is not working as intended, it's useful to start printing its variables out to the console. In order to do this effectively, we must transform our function into the less compact form and receive the entire props object without destructuring it immediately:

const Button = (props) => {
  console.log(props)
  const { onClick, text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}
This will immediately reveal if, for instance, one of the attributes has been misspelled when using the component.

NB When you use console.log for debugging, don't combine objects in a Java-like fashion by using the plus operator. Instead of writing:

console.log('props value is ' + props)
Separate the things you want to log to the console with a comma:

console.log('props value is', props)
If you use the Java-like way of concatenating a string with an object, you will end up with a rather uninformative log message:

props value is [Object object]
Whereas the items separated by a comma will all be available in the browser console for further inspection.

Logging to the console is by no means the only way of debugging our applications. You can pause the execution of your application code in the Chrome developer console's debugger, by writing the command debugger anywhere in your code.

The execution will pause once it arrives at a point where the debugger command gets executed:

fullstack content
By going to the Console tab, it is easy to inspect the current state of variables:

fullstack content
Once the cause of the bug is discovered you can remove the debugger command and refresh the page.

The debugger also enables us to execute our code line by line with the controls found in the right-hand side of the Source tab.

You can also access the debugger without the debugger command by adding break points in the Sources tab. Inspecting the values of the component's variables can be done in the Scope-section:

fullstack content
It is highly recommended to add the React developer tools extension to Chrome. It adds a new React tab to the developer tools:

fullstack content
The new React developer tools tab can be used to inspect the different React elements in the application, along with their state and props.

Unfortunately the current version of React developer tools leaves something to be desired when displaying component state created with hooks:

fullstack content
The component state was defined like so:

const [left, setLeft] = useState(0)
const [right, setRight] = useState(0)
const [allClicks, setAll] = useState([])
Dev tools shows the state of hooks in the order of their definition:

fullstack content
Rules of Hooks
There are a few limitations and rules we have to follow to ensure that our application uses hooks-based state functions correctly.

The useState function (as well as the useEffect function introduced later on in the course) must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component. This must be done to ensure that the hooks are always called in the same order, and if this isn't the case the application will behave erratically.

To recap, hooks may only be called from the inside of a function body that defines a React component:

const App = (props) => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
Event Handling Revisited
Event handling has proven to be a difficult topic in previous iterations of this course.

For this reason we will revisit the topic.

Let's assume that we're developing this simple application:

const App = (props) => {
  const [value, setValue] = useState(10)

  return (
    <div>
      {value}
      <button>reset to zero</button>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
We want the clicking of the button to reset the state stored in the value variable.

In order to make the button react to a click event, we have to add an event handler to it.

Event handlers must always be a function or a reference to a function. The button will not work if the event handler is set to a variable of any other type.

If we were to define the event handler as a string:

<button onClick={'crap...'}>button</button>
React would warn us about this in the console:

index.js:2178 Warning: Expected `onClick` listener to be a function, instead got a value of `string` type.
    in button (at index.js:20)
    in div (at index.js:18)
    in App (at index.js:27)
The following attempt would also not work:

<button onClick={value + 1}>button</button>
We have attempted to set the event handler to value + 1 which simply returns the result of the operation. React will kindly warn us about this in the console:

index.js:2178 Warning: Expected `onClick` listener to be a function, instead got a value of `number` type.
This attempt would not work either:

<button onClick={value = 0}>button</button>
The event handler is not a function but a variable assignment, and React will once again issue a warning to the console. This attempt is also flawed in the sense that we must never mutate state directly in React.

What about the following:

<button onClick={console.log('clicked the button')}>
  button
</button>
The message gets printed to the console once but nothing happens when we click the button a second time. Why does this not work even when our event handler contains a function console.log?

The issue here is that our event handler is defined as a function call which means that the event handler is actually assigned the returned value from the function, which in the case of console.log is undefined.

The console.log function call gets executed when the component is rendered and for this reason it gets printed once to the console.

The following attempt is flawed as well:

<button onClick={setValue(0)}>button</button>
We have once again tried to set a function call as the event handler. This does not work. This particular attempt also causes another problem. When the component is rendered the function setValue(0) gets executed which in turn causes the component to be re-rendered. Re-rendering in turn calls setValue(0) again, resulting in an infinite recursion.

Executing a particular function call when the button is clicked can be accomplished like this:

<button onClick={() => console.log('clicked the button')}>
  button
</button>
Now the event handler is a function defined with the arrow function syntax () => console.log('clicked the button'). When the component gets rendered, no function gets called and only the reference to the arrow function is set to the event handler. Calling the function happens only once the button is clicked.

We can implement resetting the state in our application with this same technique:

<button onClick={() => setValue(0)}>button</button>
The event handler is now the function () => setValue(0).

Defining event handlers directly in the attribute of the button is not necessarily the best possible idea.

You will often see event handlers defined in a separate place. In the following version of our application we define a function that then gets assigned to the handleClick variable in the body of the component function:

const App = (props) => {
  const [value, setValue] = useState(10)

  const handleClick = () =>
    console.log('clicked the button')

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  )
}
The handleClick variable is now assigned to a reference to the function. The reference is passed to the button as the onClick attribute:

<button onClick={handleClick}>button</button>
Naturally, our event handler function can be composed of multiple commands. In these cases we use the longer curly brace syntax for arrow functions:

const App = (props) => {
  const [value, setValue] = useState(10)

  const handleClick = () => {
    console.log('clicked the button')
    setValue(0)
  }

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  )
}
Function that returns a function
Another way to define a event handler is to use function that returns a function.

You probably won't need to use functions that return functions in any of the exercises in this course. If the topic seems particularly confusing, you may skip over this section for now and return to it later.

Let's make the following changes to our code:

const App = (props) => {
  const [value, setValue] = useState(10)

  const hello = () => {
    const handler = () => console.log('hello world')
    return handler
  }

  return (
    <div>
      {value}
      <button onClick={hello()}>button</button>
    </div>
  )
}
The code functions correctly even though it looks complicated.

The event handler is now set to a function call:

<button onClick={hello()}>button</button>
Earlier on we stated that an event handler may not be a call to a function, and that it has to be a function or a reference to a function. Why then does a function call work in this case?

When the component is rendered, the following function gets executed:

const hello = () => {
  const handler = () => console.log('hello world')

  return handler
}
The return value of the function is another function that is assigned to the handler variable.

When React renders the line:

<button onClick={hello()}>button</button>
It assigns the return value of hello() to the onClick attribute. Essentially the line gets transformed into:

<button onClick={() => console.log('hello world')}>
  button
</button>
Since the hello function returns a function, the event handler is now a function.

What's the point of this concept?

Let's change the code a tiny bit:

const App = (props) => {
  const [value, setValue] = useState(10)

  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }

  return (
    <div>
      {value}
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}
Now the application has three buttons with event handlers defined by the hello function that accepts a parameter.

The first button is defined as

<button onClick={hello('world')}>button</button>
The event handler is created by executing the function call hello('world'). The function call returns the function:

() => {
  console.log('hello', 'world')
}
The second button is defined as:

<button onClick={hello('react')}>button</button>
The function call hello('react') that creates the event handler returns:

() => {
  console.log('hello', 'react')
}
Both buttons get their own individualized event handlers.

Functions returning functions can be utilized in defining generic functionality that can be customized with parameters. The hello function that creates the event handlers can be thought of as a factory that produces customized event handlers meant for greeting users.

Our current definition is slightly verbose:

const hello = (who) => {
  const handler = () => {
    console.log('hello', who)
  }

  return handler
}
Let's eliminate the helper variables and directly return the created function:

const hello = (who) => {
  return () => {
    console.log('hello', who)
  }
}
Since our hello function is composed of a single return command, we can omit the curly braces and use the more compact syntax for arrow functions:

const hello = (who) =>
  () => {
    console.log('hello', who)
  }
Lastly, let's write all of the arrows on the same line:

const hello = (who) => () => {
  console.log('hello', who)
}
We can use the same trick to define event handlers that set the state of the component to a given value. Let's make the following changes to our code:

const App = (props) => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => () => {
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}
When the component is rendered, the thousand button is created:

<button onClick={setToValue(1000)}>thousand</button>
The event handler is set to the return value of setToValue(1000) which is the following function:

() => {
  setValue(1000)
}
The increase button is declared as following:

<button onClick={setToValue(value + 1)}>increment</button>
The event handler is created by the function call setToValue(value + 1) which receives as its parameter the current value of the state variable value increased by one. If the value of value was 10, then the created event handler would be the function:

() => {
  setValue(11)
}
Using functions that return functions is not required to achieve this functionality. Let's return the setToValue function that is responsible for updating state, into a normal function:

const App = (props) => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>
        thousand
      </button>
      <button onClick={() => setToValue(0)}>
        reset
      </button>
      <button onClick={() => setToValue(value + 1)}>
        increment
      </button>
    </div>
  )
}
We can now define the event handler as a function that calls the setToValue function with an appropriate parameter. The event handler for resetting the application state would be:

<button onClick={() => setToValue(0)}>reset</button>
Choosing between the two presented ways of defining your event handlers is mostly a matter of taste.

Passing Event Handlers to Child Components
Let's extract the button into its own component:

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
The component gets the event handler function from the handleClick prop, and the text of the button from the text prop.

Using the Button component is simple, although we have to make sure that we use the correct attribute names when passing props to the component.

fullstack content
Do Not Define Components Within Components
Let's start displaying the value of the application into its own Display component.

We will change the application by defining a new component inside of the App-component.

// This is the right place to define a component
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = props => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    setValue(newValue)
  }

  // Do not define components inside another component
  const Display = props => <div>{props.value}</div>

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```

アプリケーションはまだ機能しているように見えますが, このようなコンポーネントは実装しないでください！
他のコンポーネントの内部にコンポーネントを定義しないでください.
この方法には利点がなく, 多くの不都合な問題を引き起こします.
代わりに, `Display`コンポーネント関数を正しい位置 (`App`コンポーネント関数の外)に移動してみましょう.

```js
const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = props => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```

## Useful Reading
ウェブにはReact関連の資料がたくさんあります.
ただし, このコースではReactの新しい記法を使用しているため, オンラインで見つかった資料の大部分は, 我々の目的には古くなっています.

次のリンクが役立つ場合があるでしょう.
<ul>
  <li>
    <a href="https://reactjs.org/docs/hello-world.html">Reactの公式ドキュメント</a>は, いつか確認する価値がありますが, その大部分はコースの後半でのみ関連性があります.
    また, クラスベースのコンポーネントに関連する全てのトピックはコースには関係がありません.
  </li>
  <li>
    <a href="https://egghead.io/">Egghead.io</a>にある<a href="https://egghead.io/courses/start-learning-react">Start learning React</a>のようなコースは質が高く,
    最近更新された<a href="https://egghead.io/courses/the-beginner-s-guide-to-reactjs">The Beginner's Guide to React</a>も比較的良いものです.
    注意: 前者はクラスコンポーネントを使用していますが, 後者は新しいfuncionalコンポーネントを使用しています.
  </li>
</ul>