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


## Exercies 1.6. -1.14.
まずあなたのコードをGitHubにプッシュして, 完了した演習を<a href="https://studies.cs.helsinki.fi/stats/courses/fullstackopen">提出システム</a>にチェックして, 演習の解答を提出しましょう.

1つのパートのすべての演習を1回の課題提出で提出することを忘れないでください.
一度, 1つのパートの解答を提出したら, それ以上そのパートの演習を提出することはできません.

一部の演習は同じアプリケーションで機能します.
これらの場合, アプリケーションの最終バージョンだけを提出すれば十分です.
必要であれば, それぞれの演習が終了した後にコミットしても構いませんが, それは必須ではありません.

警告: `create-react-app`は, 既存のgitリポジトリの中でアプリケーションを作成しない限り,
プロジェクトを自動的にgitリポジトリに変えてしまします.
たいていの場合, それぞれのプロジェクトを別々のリポジトリにしたくないので,
アプリケーションのルートで`rm -rf .git`コマンドを実行して.gitフォルダを削除しましょう.

ｋ