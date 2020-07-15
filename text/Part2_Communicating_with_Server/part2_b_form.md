# Forms

ユーザーが新しい`notes`を追加できるようにして, アプリケーションを拡張し続けましょう.

新しい`notes`が追加されたときにページを更新するためには,
`notes`を`App`コンポーネントのstateで保存するのが最適です.
`useState`関数をインポートし, それを使用して, propsで渡された最初の`notes`配列で初期化されるstateの一部を定義しましょう.

```js
import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App
```

コンポーネントは, `useState`関数を使用とpropsに渡された`notes`配列を使用して,
`notes`に保存された状態を初期化します.

```js
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  // ...
}
```

空の`notes`のリストから始めたい場合は, 初期値を空配列として設定します.
そして, `props`は使用されていないので, 関数の定義から`props`パラメータを省略できます.

```js
const App = () => {
  const [notes, setNotes] = useState([])

  // ...
}
```

とりあえずpropsに渡された初期値を使いましょう.

次に, 新しい`notes`の追加に使用されるコンポーネントにHTMLフォームを追加しましょう.

```js
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
```

送信ボタンをクリックして, フォームが送信されるときに呼び出されるフォーム要素に,
イベントハンドラーとして`addNote`関数を追加しました.

イベントハンドラーの定義には, パート1で説明したメソッドを使用します.

```js
const addNote = (event) => {
  event.preventDefault()
  console.log('button clicked', event.target)
}
```

`event`パラメータは, イベントハンドラー関数の呼び出しをトリガーするイベントです.

イベントハンドラーはすぐに`event.preventDefault()`メソッドを呼び出し,  フォーム送信時のデフォルトの動作を防止します.
ここでのデフォルトの動作とは, ページのリロードです.

`evnet.target`に格納されているイベントのターゲットは, コンソールに記録されます.

<img src="https://fullstackopen.com/static/74fb6fa76af47ec0301ec15163cf74e8/5a190/6e.png">

この場合のターゲットは, コンポーネントで定義したフォームです.

フォームの`input`要素に含まれるデータにはどのようにアクセスすればよいでしょうか？

これを行うには多くの方法があります.
最初に紹介する手法は, いわゆる制御コンポーネントを使用する方法です.

ユーザーが送信した入力を保持するために, `newNote`という新しい状態を追加して,
それを`input`要素の`value`属性として追加しましょう.

```js
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note...'
  )

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
```

state `newNote`の初期値として保存されたプレースホルダーテキストは`input`要素に表示されますが,
入力テキストは編集できません.
コンソールに警告が表示され, 問題の原因がわかります.

<img src="https://fullstackopen.com/static/2905b1f4edfe786a70566fe4a7a3a0e9/5a190/7e.png">

`App`コンポーネントのstateの一部を`input`要素の`value`属性として割り当てたため,
`App`コンポーネントが`input`要素の動作を制御するようになりました.

`input`要素の編集を有効にするためには, 入力に加えられた変更をコンポーネントのstateと同期させるイベントハンドラーを登録する必要があります.

```js
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note...'
  )

  // ...

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
```

これで, フォームの`input`要素の`onChange`属性にイベントハンドラーが登録されました.

```js
<input
  value={newNote}
  onChange={handleNoteChange}
/>
```

イベントハンドラーは, `input`要素で変更が発生するたびに呼び出されます.
イベントハンドラー関数は, イベントオブジェクトを`event`パラメータとして受け取ります.

```js
const handleNoteChange = (event) => {
  console.log(event.target.value)
  setNewNote(event.target.value)
}
```

イベントオブジェクトの`target`プロパティは, 制御された`input`要素に対応し,
`event.target.value`はその要素の入力値を参照します.

`onSubmit`イベントハンドラーで行ったように, `event.preventDefault()`メソッドを呼び出す必要がないことに注意してください.
これは, フォームの送信とは異なり, 入力の変更時に発生するデフォルトの動作がないためです.

コンソールをたどることで, イベントハンドラがどのように呼び出されているかを確認できます.

<img src="https://fullstackopen.com/static/a8548b60018e45a30412b33bf4a76c62/5a190/8e.png">

<a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi">React devtools</a>をインストールしたことを覚えていますか？
すばらしいですね. React Devtoolsタブから, stateの変化を直接確認できます.

<img src="https://fullstackopen.com/static/befc5ce08f93dc38d3ebd4db5863a4dc/5a190/9ea.png">

これで, `App`コンポーネントの`newNote`の状態は入力の現在の値を反映します.
つまり, 新しい`notes`を作成するための`addNote`関数を完成させることができます.

```js
const addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    date: new Date().toISOString(),
    important: Math.random() < 0.5,
    id: notes.length + 1,
  }

  setNotes(notes.concat(noteObject))
  setNewNote('')
}
```

まず, コンポーネントの状態`newNote`からコンテンツを受け取る`noteObject`という名前の新しいオブジェクトを作成します.
一意の識別子である`id`は, ノートの総数に基づいて生成されます.
ノートが削除されることはないため, この方法でアプリケーションは機能します.
`Math.random()`関数を用いることで, ノートは50%の確率で重要なものとしてマークされます.

新しいノートは, パート1で導入した`concat`メソッドを使用してノートのリストに追加します.

```js
setNotes(notes.concat(noteObject))
```

このメソッドは, 元の`notes`配列を変更せずに, 配列の新しいコピーを作成して, 新しいアイテムを最後に追加します.
Reactでstateを直接変更してはならないため, これは非常に重要です.

イベントハンドラーは, 状態`newNote`の`setNewNote`関数を呼び出すことによって,
制御された入力要素の値もリセットします.

```js
setNewNote('')
```

現在のアプリケーションのコード全体は, <a href="https://github.com/fullstack-hy2020/part2-notes/tree/part2-2">このgithubリポジトリ</a>のpart2-2ブランチにあります.

## Filtering Displayed Elements
重要なノートのみを表示できる新しい機能をアプリケーションに追加しましょう.

どのノートを表示すべきかを追跡するためのstateを`App`コンポーネントに追加してみましょう.

```js
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // ...
}
```

`notesToShow`変数に表示されるすべてのノートのリストを格納するようにコンポーネントを変更してみましょう.
リストの項目は, コンポーネントの状態によって異なります.

```js
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // ...

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      // ...
    </div>
  )
}
```

`notesToShow`変数の定義はかなりコンパクトです.

```js
const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)
```

この定義では, 他の多くのプログラミング言語にもある条件演算子を使用しています.

オペレータは次のように機能します.

```js
const result = condition ? val1 : val2
```

上記の文の場合, 条件が`true`であれば, `result`変数の値は`val1`に設定されます.
条件が`false`の場合, `result`変数の値は`val2`に設定されます.

`showAll`の値が`false`の場合, `notesToShow`変数は, `important`プロパティが`true`に設定されているノートのみに割り当てられます.
このとき, フィルタリングは配列の`filter`メソッドを使用して行われます.

```js
notes.filter(note => note.important === true)
```

`note.important`の値が`true`または`false`であるため, 比較演算子の使用は実際には冗長です.
つまり, 次のように簡単に記述できます.

```js
notes.filter(note => note.important)
```

最初に比較演算子を用いた方法を示した理由は, JavaScriptでは, `val1 == val2`はすべての状況で期待通りに機能せず,
比較の際には, `val1 === val2`を使用する方が安全であるという重要な事柄を強調するためでした.
このトピックについての詳細事項は, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness">こちら</a>をご覧ください.

状態`showAll`の初期値を変更して, フィルタリング機能をテストできます.

次に, ユーザがユーザインターフェースからアプリケーションの状態`showAll`を切り替えることができる機能を追加してみましょう.

関連する変更を以下に示します.

```js
import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // ...

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      // ...
    </div>
  )
}
```

表示されるノート (全てまたは重要なノート) はボタンで制御されます.
ボタンのイベントハンドラーは非常に単純なので, ボタン要素の属性で直接定義されます.
イベントハンドラーは`showAll`の値を`true`から`false`に, またはその逆に切り替えます.

```js
() => setShowAll(!showAll)
```

ボタンのテキストは, 状態`showAll`の値によって異なります.

```js
show {showAll ? 'important' : 'all'}
```

現在のアプリケーションのコード全体は, <a href="https://github.com/fullstack-hy2020/part2-notes/tree/part2-3">このgithubリポジトリ</a>のpart2-3ブランチにあります.