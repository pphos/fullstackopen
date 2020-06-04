# Webアプリケーションの基礎
プログラミングを始める前に, https://fullstack-example.app.herokuapp.com/ にあるアプリケーションの例を調査することで,
Web開発の原則を学びます.
このアプリケーションのフィンランド語版は https://fullstack-example.now.sh にあります.
どちらを使うかは自由です.

これらのアプリケーションは, このコースの基本的な概念を示すためだけに存在しており,
Webアプリケーションがどのように作られるべきかを示すものではありません.
それどころか, それらはWeb開発の古い技術を示すものであり, 今日では悪しき慣習とさえ見られています.

推奨スタイルでのコーディングはPart1から始まります.

コースの残りの部分では, Chromeブラウザを使用してください.

ブラウザでサンプルアプリケーションを開きましょう.
これにはしばらく時間がかかる場合があります.

<b>Web開発の1つ目のルール:</b>
ブラウザ上でデベロッパーツールを常に開いておくこと.
macOSでは, `F12`か`option-cmd-i` を同時に押してコンソールを開きます.
Windowsでは, `F12`か`ctrl-shift-i`を同時に押してコンソールを開きます.

続ける前に, コンピュータ上で開発者コンソールを開く方法を確認し,
Webアプリケーションを開発する際には常に開いておくことを忘れないようにしてください.

コンソールは次のようになります:

<img src="https://fullstackopen.com/static/aaaefdadeccea5768728b3cdd41fd8f2/14be6/1e.png">

Network タブが開かれていることを確認し, 次に示すように Disable Cache オプションをオンにします.
ログを保存すると, ページがリロードされたときに, アプリケーションによって表示されたログを保存することができます.

<b>注意:</b> 最も重要なタブは Console です. ただし, 概要では, Network タブを多く使用します.

## HTTP GET
サーバとWebブラウザは, <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP">HTTP</a>プロトコルを使用して相互に通信します.
Network タブには, ブラウザとサーバがどのように通信するかが表示されます.

ページをリロードすると(F5キーを押すか, ブラウザの↺の記号を押す), コンソールには2つのイベントが発生したことが表示されます.

- ブラウザはサーバから fullstack-exampleapp.herokuapp.com/ の内容を取得します.
- そして, kuva.pngの画像をダウンロードします.

<img src="https://fullstackopen.com/static/af6f88822db737cac2ea80d9343756fc/14be6/2e.png">

小さな画面では, コンソールのウィンドウを広げないと見えないかもしれません.

最初のイベントをクリックすると, 何が起こっているかの詳細情報が表示されます.

<img src="https://fullstackopen.com/static/ddcd5afaeabfc1b0e8a4325bfeff90ee/14be6/3e.png">

上部の General は, ブラウザがGETメソッドを使ってアドレス https://fullstack-exampleapp.herokuapp.com/ へのリクエストを行ったことを示しており,
サーバのレスポンスにはステータスコード200が含まれていたために, リクエストが成功したことを示しています.

リクエストとサーバのレスポンスにはいくつかのヘッダがあります:

<img src="https://fullstackopen.com/static/5e6569d4ad80edce4a03a25358b8f195/14be6/4e.png">

上部にあるレスポンスヘッダは, レスポンスのサイズをバイト単位で表し, レスポンスの正確な時間を教えてくれます.
重要なヘッダである Content-Typeは, レスポンスがutf-8形式のテキストファイルであり, その内容がHTMLでフォーマットされていることを教えてくれます.
このようにして, ブラウザはレスポンスが通常のHTMLページであることを認識し, それを「Webページのように」ブラウザに表示します.

Response タブには, 通常のHTMLページである応答データが表示されます.
bodyセクションは, 画面に表示されるページの構造を決定します.

<img src="https://fullstackopen.com/static/4e49815c455c943b6eb14fe8cc0cefb3/14be6/5e.png">

ページには`div`要素が含まれ, その中には見出し, ページノートへのリンク, `img`タグが含まれ,
作成されたノートの数が表示されます.

`img`タグがあるため, ブラウザはサーバから画像kuva.pngを取得するために2回目のHTTPリクエストを行います.
リクエストの詳細は以下の通りです.

<img src="https://fullstackopen.com/static/f053fa9082a1ad72066fa193346d0378/14be6/6e.png">

リクエストは https://fullstack-exampleapp.herokuapp.com/kuva.png に行われ, そのタイプは HTTP GET です.
レスポンスヘッダを見ると, レスポンスサイズは89350バイトで, `Content-Type`は`image/png`なので,
png画像であることが分かります.
ブラウザはこの情報を利用して, 画像を正しくスクリーンにレンダリングします.

ブラウザで https://fullstack-exampleapp.herokuapp.com/ を開くことで発生する一連のイベントは, 以下のシーケンス図のようになります.

<img src="https://fullstackopen.com/static/972354fefd202e82e2c4a64d4d7c6125/14be6/7e.png">

最初に, ブラウザはサーバにHTTP GETリクエストを送信して, ページのHTMLコードを取得します.
HTMLの`img`タグは, ブラウザにkuva.pngの画像を取得するように促します.
その後, ブラウザはHTMLページと画像をスクリーンに表示します.

気づくことは難しいですが, サーバから画像が取り込まれる前にHTMLページのレンダリングが始まります.

## 従来のWebアプリケーション
サンプルアプリケーションのホームページは, 従来のWebアプリケーションのように動作します.
Webページに入ると, ブラウザはページの構造とテキストの内容を詳細に記述したHTMLドキュメントをサーバから取得します

サーバは何らかの方法でこのドキュメントを作成しました.
ドキュメントは, サーバのディレクトリに保存された静的テキストファイルにすることができます.
サーバは, 例えばデータベースからデータを使って, アプリケーションのコードに応じて動的にHTMLドキュメントを作成することができます.
サンプルアプリケーションのHTMLコードには, 作成されたノートの数に関する情報が含まれているため,
動的に作成されています.

ホームページのHTMLコードは以下の通りです.

```js
const getFrontPageHtml = (noteCount) => {
  return(`
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <div class='container'>
          <h1>Full stack example app</h1>
          <p>number of notes created ${noteCount}</p>
          <a href='/notes'>notes</a>
          <img src='kuva.png' width='200' />
        </div>
      </body>
    </html>
`)
}

app.get('/', (req, res) => {
  const page = getFrontPageHtml(notes.length)
  res.send(page)
})
```

まだ上記のコードを理解する必要はありません.

HTMLページの内容は, テンプレート文字列として保存されていたり,
その途中で変数を評価できるような文字列として保存されていたりします.
ホームページの動的に変化する部分である, 保存されたノート数 (`noteCount`)は,
テンプレート文字列の現在のノート数 (`note.length`) に置き換えられます.

コード中にHTMLを書くのはもちろん賢明ではありませんが,
従来のPHPプログラマーにとっては, これは慣例でした.

従来のWebアプリケーションでは, ブラウザは物言うことができないものである.
ブラウザはサーバからHTMLデータを取得するだけで, すべてのアプリケーションロジックはサーバ上にあります.
サーバは, 例えば, ヘルシンキ大学のWeb-palvelinohjelmointiコースのようにJavaScrip, Python Flask (tietokantasovellusコースのように)またはRuby on Railsを用いて構築できます.

サンプルアプリケーションでは, Node.jsのExpressフレームワークを利用しています.
このコースでは, Node.jsとExpressを用いてWebサーバを作成します.

## ブラウザ上でのアプリケーションの実行
Developer toolを開いたままにしておいてください.
🚫マークをクリックしてコンソールをクリアします.
ノートページに行くと, ブラウザは4つのHTTPリクエストを行います:

<img src="https://fullstackopen.com/static/02ed5b206f76e1f9bcf4ad3ffff8a2b4/14be6/8e.png">

すべてのリクエストには異なるタイプがあります.
最初のリクエストタイプはドキュメントです.
以下はページのHTMLコードです.

<img src="https://fullstackopen.com/static/8856aaf0012972e3b7d5b1dfc6aaa3f6/14be6/9e.png">

ブラウザに表示されたページとサーバから返されたHTMLコードを比較すると,
コードにノートのリストが含まれていないことが分かります.
HTMLのヘッドセクションにはscript-tagが含まれているため,
ブラウザは`main.js`というJavaScriptファイルを取得します.

取得したJavaScriptコードは以下の通りです.

```js
var xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText)
    console.log(data)

    var ul = document.createElement('ul')
    ul.setAttribute('class', 'notes')

    data.forEach(function(note) {
      var li = document.createElement('li')

      ul.appendChild(li)
      li.appendChild(document.createTextNode(note.content))
    })

    document.getElementById('notes').appendChild(ul)
  }
}

xhttp.open('GET', '/data.json', true)
xhttp.send()
```

上記のコードの詳細は今のところ重要ではありませんが,
画像やテキストに面白さをもたせるためにのコードがいくつか入っています.
しっかりとコーディングを始めるのはPart1からです.
このPartのサンプルコードは, 実はこのコースのコーディングテクニックと全く関係がありません.

  モダンなfetch APIでなく, なぜxhttp-objectが使われているか不思議に思う人もいるかもしれません.
  これは, まだPromiseの話題に触れたくないことと, このPartにおいてコードは二の次だからです.
  サーバへのリクエストを行うモダンな方法については, Part2で紹介します.

`script`タグを取得した直後に, ブラウザはコードを実行します.

最後の2行は, ブラウザがサーバのアドレス/data.jsonに対してHTTP GETリクエストを行うことを定義しています.

```js
xhttp.open('GET', '/data.json', true)
xhttp.send()
```

これは `Network`タブに表示されている一番下のリクエストです.

ブラウザから直接 https://fullstack-exampleapp.heroku.com/data.json にアクセスしてみましょう.

<img src="https://fullstackopen.com/static/cb83e4c1c89fd4bc662942457f30403e/14be6/10e.png">

そこには, JSONの「生データ」のノートがあります.
デフォルトでは, ブラウザはJSONデータを表示することがあまり得意ではありません.
プラグインを使用することで, JSONデータのフォーマットを行うことができます.
例えば, Chromeに<a href="https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc">JSONView</a>をインストールして, リロードするときれいにフォーマットされたJSONデータが出力されます.

<img src="https://fullstackopen.com/static/fd335c19a19f2176040834b7c5533193/14be6/11e.png">

上記のノートページのJavaScriptコードは, ノートを含むJSONデータをダウンロードし,
ノートの内容から箇条書きリストを形成しており, そのコードは以下のようになります.

```js
const data = JSON.parse(this.responseText)
console.log(data)

var ul = document.createElement('ul')
ul.setAttribute('class', 'notes')

data.forEach(function(note) {
  var li = document.createElement('li')

  ul.appendChild(li)
  li.appendChild(document.createTextNode(note.content))
})

document.getElementById('notes').appendChild(ul)
```

このコードでは, 最初に`ul`タグを持つ順不同のリストを生成します.

```js
var ul = document.createElement('ul')
ul.setAttribute('class', 'notes')
```

そして, 各ノートに1つの`li`タグを追加します.
すると各ノートのcontentフィールドのみが`li`タグの内容になります.
rawデータに存在するタイムスタンプは, ここでは何も使用しません.

```js
data.forEach(function(note) {
  var li = document.createElement('li')

  ul.appendChild(li)
  li.appendChild(document.createTextNode(note.content))
})
```

次にDeveloper toolsの Consoleタブを開きます:

<img src="https://fullstackopen.com/static/7b61ba46a7734400891ed78cf57011cb/14be6/12e.png">

行頭にある小さな三角形をクリックすると, コンソールのテキストを展開できます.

<img src="https://fullstackopen.com/static/fd335c19a19f2176040834b7c5533193/14be6/13e.png">

コンソールの出力は, `console.log`コマンドによるものです.

```js
const data = JSON.parse(this.responseText)
console.log(data)
```

サーバからデータを受信した後, コードはそれをコンソールに出力します.

Consoleタブと`console.log`コマンドは, コースで頻繁に使用します.

## Event handlersとCallback functions
以下のコードの構造は少し変わっています.

```js
var xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function() {
  // code that takes care of the server response
}

xhttp.open('GET', '/data.json', true)
xhttp.send()
```

サーバへの要求は最後の行で送信されますが, レスポンスを処理するコードはその上にあります.
これはどうしてでしょうか?

この行では,

```js
xhttp.onreadystatechange = function () {
```

リクエストを処理するxhttpオブジェクトに対して, `onreadystatechange`のイベントハンドラが定義されています.
オブジェクトの状態が変化すると, ブラウザはイベントハンドラを呼び出します.
この関数のコードは, `readyState`が`4`に等しいこと(これは操作が完了したことを表しています)と,
レスポンスのステータスコードが200であることをチェックしています.

```js
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    // code that takes care of the server response
  }
}
```

イベントハンドラを呼び出す仕組みは, JavaScriptでは非常に一般的です.
イベントハンドラ関数はコールバック関数とよばれています.
アプリケーションコードが, 関数そのものを呼び出すのではなく,
実行環境であるブラウザが, イベントが発生したタイミングで関数を呼び出します.

## Document Object Model (DOM)
HTMLページは暗黙の木構造と考えることができます.

```html
html
  head
    link
    script
  body
    div
      h1
      div
        ul
          li
          li
          li
      form
        input
        input
```

同じ木構造がConsoleタブのElementsに表示されます.

<img src="https://fullstackopen.com/static/081eb2d1f52d2536382d5d3efe0bc87f/14be6/14e.png">

ブラウザの機能は, HTMLの要素をツリーとして描画するという考え方に基づいています.

Document Object Model (DOM)とは, Webページに対応する要素ツリーをプログラムで変更できるようにするAPIを指します.

前のチャプターで紹介したJavaScriptのコードでは, DOM APIを用いてノートのリストをページに追加していました.

次のコードは, `ul`に新しいノードを作成し, そのノードにいくつかの子ノードを追加します.

```js
var ul = document.createElement('ul')

data.forEach(function(note) {
  var li = document.createElement('li')

  ul.appendChild(li)
  li.appendChild(document.createTextNode(note.content))
})
```

最後に, ulのツリーブランチは, ページ全体のHTMLツリーの適切な場所に接続されます.

```js
document.getElementById('notes').appendChild(ul)
```

## コンソールによるドキュメントオブジェクトの操作
HTMLドキュメントのDOMツリーの最上位ノードを`document`オブジェクトと呼びます.
DOM APIを使用して, Webページで様々な操作を実行できます.
`Console`タブに`document`とタイプすることで, `document`オブジェクトにアクセスすることができます.

<img src="https://fullstackopen.com/static/ac9364f4d597d187d271a1628a332e7d/14be6/15e.png">

コンソールからページに新しいノートを追加してみましょう.

まず, ページからノートのリストを取得します.
リストはページの最初の`ul`要素にあります.

```js
list = document.getElementsByTagName('ul')[0]
```

次に, 新しい`li`要素を生成し, そこにテキストコンテンツを追加します.

```js
newElement = document.createElement('li')
newElement.textContent = 'Page manipulation from console is easy'
```

そして, 新しい`li`要素をリストに追加します.

```js
list.appendChild(newElement)
```

<img src="https://fullstackopen.com/static/5971f5573de2bc91961f679e27430097/14be6/16e.png">

ブラウザでページが更新されたとしても, 変更は永続的ではありません.
ページがリロードされると, 変更がサーバに反映されていなかったために, 新しいノートは消えます.
ブラウザが取得するJavaScriptコードは, https://fullstack-exampleapp.herokuapp.com/data.json のアドレスから
JSONデータに基づいてノートのリストを生成します.

## CSS
NotesページのHTMLコードの`head`要素には`link`タグが含まれており,
ブラウザは`main.css`というアドレスからCSSを取得しなければならないと判断しています.

Cascading Style Sheet (CSS)は, Webページに見た目を決定するために用いられるマークアップ言語です.

取得されたCSSファイルは次のようになります.

```css
.container {
  padding: 10px;
  border: 1px solid;
}

.notes {
  color: blue;
}
```

ファイルでは2つのクラスセレクタを定義しています.
これらは, ページの特定の部分を選択し, スタイルを適用するためのスタイル規則を定義するために用いられます.

クラスセレクタの定義は常にピリオドではじまり, クラス名が含まれます.

クラスは属性であり, HTML要素に追加できます.

CSS属性は, `console`の`element`タブで確認できます.

<img src="https://fullstackopen.com/static/4504fc2e95de826dd766aca1d0940ea4/14be6/17e.png">

最も外側の`div`要素は, `container`クラスを持っており,
ノートのリストを含む`ul`要素は, `notes`クラスを持っています.

このCSSの規則では, `container`クラスを持つ要素は1ピクセル幅の枠で囲まれるように適宜されています.
また, 要素に10ピクセルのパディングを設定しています.
これにより, 要素のコンテンツと境界線の間に空白が追加されます.

2番目のCSS規則では, ノートのテキストの色を青に設定しています.

HTML要素は, クラス以外の属性も持つことができます.
`div`要素に含まれているノートには`id`属性があります.
JavaScriptのコードは`id`を使用して要素を検索します.

`console`の`Elements`タブを使用すると, 要素のスタイルを変更できます.

<img src="https://fullstackopen.com/static/ef664dbcddaeef64c5ff6e180e42e5ca/14be6/18e.png">

`console`で行った変更は永続的ではありません.
永続的な変更を行う場合には, サーバ上のCSSに保存しなければなりません.


## JavaScriptを含むページの読み込み -改訂
ブラウザで https://fullstack-exampleapp.herokuapp.com/notes ページを開いたときに何が起こるかを再確認してみましょう.

- ブラウザは, HTTP GETリクエストを使用して, コンテンツとページの構造を定義するHTMLコードをサーバから取得します.
- HTMLコード内のリンクにより, ブラウザは`main.css`のスタイルシートも取得します.
- `main.js`も同じように取得します.
- 次に, ブラウザがJavaScriptコードを実行します.
  コードは, HTTP GETリクエストを https://fullstack-exampleapp.herokuapp.com/data.json に送信し, JSONデータとしてノートを返します.
- データが取得されると, ブラウザはイベントハンドラを実行し, DOM-APIを使用してページにノートをレンダリングします.

## フォームとHTTP POST
次に, 新しいメモを追加する方法を見てみましょう.

ノートページには`form`要素が含まれています.

<img src="https://fullstackopen.com/static/2dbe9f6d3c9999766d2cbad6200fea40/14be6/20e.png">

フォームのボタンがクリックされると, ブラウザはユーザの入力をサーバに送信します.
`Network`タブを開いて, フォームの送信がどのようになるかを確認してみましょう.

<img src="https://fullstackopen.com/static/7951d2221d80f63a78350106150d5e61/14be6/21e.png">

驚くべきことに, フォームを送信すると, 合計5つのHTTPリクエストが発生します.
最初のものはフォームの送信イベントです.
これをより詳しく見ましょう.

<img src="https://fullstackopen.com/static/ac09c143991ad160bdaa1c1381d93f7b/14be6/22e.png">

これは`new_note`のサーバアドレスへのHTTP POSTリクエストです.
サーバはHTTPのステータスコード302で応答します.
これはURLリダイレクトを意味しており, サーバはブラウザに対して,
ヘッダの`Location`で定義されたアドレスへの新しいHTTP GETリクエストを行うように要求しています.

したがって, ブラウザはノートページをリロードします.
リロードにより, スタイルシートの取得 (`main.css`),
JavaScriptコードの取得 (`main.js`),
ノートの生データの取得 (`data.json`)という3つのHTTPリクエストが発生します.

`Network`タブには, フォームで送信されたデータも表示されます.

<img src="https://fullstackopen.com/static/baad2297bb966ed9387cb3a0d79fa4f8/14be6/23e.png">

`form`タグには`action`および`method`属性があり,
フォームの送信が`new_note`というアドレスへのHTTP POSTリクエストとして行われることを定義しています.

<img src="https://fullstackopen.com/static/9463d1dca4170015c47e79065ff98820/14be6/24e.png">

POSTリクエストを処理するサーバ上のコードは単純です.
(注: 以下のコードはサーバ上に存在し, ブラウザによって取得されたJavaScriptコード上には存在しません.)

```js
app.post('/new_note', (req, res) => {
  notes.push({
    content: req.body.note,
    date: new Date(),
  })

  return res.redirect('/notes')
})
```

データはPOSTリクエストのbodyとして送信されます.

サーバは, リクエストオブジェクト`req`の`req.body`フィールドにアクセスすることでデータにアクセスできます.

サーバは新しいノートオブジェクトを作成し, それを`notes`という配列に追加します.

```js
notes.push({
  content: req.body.note,
  date: new Date(),
})
```

Notesオブジェクトには2つのフィールドがあります.
`content`にはノートの実際のコンテンツが含まれ,
`date`にはノートが作成された日時が含まれます.
サーバは新しいノートをデータベースに保存しないため,
Herokuがサービスを再起動すると, 新しいノートは消滅します.

## AJAX
Notesページアプリケーションは, Web開発初期のスタイルを踏襲しており, Ajaxを使用しています.
そのため, このアプリケーションは2000年代初頭のWeb技術の流行にしたがってつくられています.

AJAX (Asynchronous Javascript and XML)は, ブラウザ技術の進歩を背景に2005年2月に導入された用語であり,
HTML内に含まれるJavaScriptを使用して, ページを再レンダリングすることなくWebページにコンテンツを取得することを可能にする
新しい画期的な手法を説明するためのものです.

AJAX時代以前は, すべてのWebページは, この章の冒頭で紹介した従来型のWebアプリケーションのように機能していました.
ページに表示されるすべてのデータは, サーバによって生成されたHTMLコードから取得されました.

Notesページでは, AJAXを使用してノートデータを取得します.
フォームの送信では, 従来のWebフォームの送信方法をが引き続き使用されています.

アプリケーションのURLは, 古くて規約が決まってなかった時代のものであることを反映しています.
JSONデータは, https://fullstack-exampleapp.herokuapp.com/data.json から取得され,
新しいノートは https://fullstack-exampleapp.herokuapp.com/new_note に送信されます.
このようなURLは, RESTfull APIの一般に認められる規約に準拠していないため,
今日では受け入れられないと考えられています.
これについては, Part3で詳しく見てきます.

AJAXの技術は今では当たり前のように使われています.
この用語は忘れさられて, 新しい世代の人たちはその言葉を聞いたことすらありません.

## Single page app
サンプルアプリケーションでは, ホームページは従来型のWebページと同じように機能します.
ロジックはすべてサーバ上にあり, ブラウザは指示通りにHTMLをレインダリングするだけです.

Notesページでは, 既存のノートのHTMLコードを生成する責任の一部をブラウザに委ねています.
ブラウザは, サーバから取得したJavaScriptコードを実行することでこのタスクに取り組みます.
このコードはサーバからノートをJSONデータとして取得し,
DOM-APIを使用してページにノートを表示するためのHTML要素を追加します.

近年, Webアプリケーションを作成する Single Page Application (SPA)というスタイルが登場しました.
SPAスタイルのWebサイトは, サンプルアプリケーションのように,
全てのページをサーバから個別に取得するのではなく,
サーバから取得した1つのHTMLページのみで構成され,
そのコンテンツはブラウザで実行されるJavaScriptで操作されます.

Notesページアプリケーションは, SPAスタイルのアプリケーションと類似点がありますが,
完全に同じものではありません.
ノートをレンダリングするロジックはブラウザで実行されますが,
ページはまた新しいノートを追加するための従来の方法を使用しています.
データはフォーム送信でサーバに送信され, サーバはブラウザにリダイレクトでNoteページをリロードするように指示します.

サンプルアプリケーションのSPAは, https://fullstack-exampleapp.herokuapp.com/spa から利用できます.
一見すると, このアプリケーションは最初に紹介したものと全く同じに見えます.
HTMLコードはほぼ同じですが, JavaScriptファイル(`spa.js`)が異なっており,
`form`タグの定義方法に若干の変更があります.

<img src="https://fullstackopen.com/static/cb1893b2f18168168b3337ef994f0347/14be6/25e.png">

フォームには, 入力データの送信方法と送信先を定義する`action`または`method`属性がありません.

`Network`タブを開き,  🚫をクリックして空にします.
ここで新しいノートを作成すると, ブラウザがサーバに1つのリクエストしか送信していないことに気づくでしょう.

<img src="https://fullstackopen.com/static/07beb53097a520517c1c28ff17fc907a/14be6/26e.png">

`new_note_spa`へのPOSTリクエストには, 新しいノートがJSONデータとして含まれており,
そのJSONデータには, ノートのコンテンツ(`content`)とタイムsタンプ(`date`)の両方が含まれています.

```js
{
  content: "single page app does not reload the whole page",
  date: "2019-05-25T15:15:59.905Z"
```

リクエストの`Content-Type`ヘッダーは, 含まれるデータがJSON形式で表されることをサーバに通知します.

<img src="https://fullstackopen.com/static/5819436c98e4cce143fce3fe9bc534b9/14be6/27e.png">

このヘッダーがないと, サーバはデータを正しく解析する方法を知ることができません.

サーバは, ステータスコード201で応答します.
今回はサーバがリダイレクト要求をせず, ブラウザは同じページにとどまり, それ以上のHTTPリクエストを送信しません.

SPA版のアプリケーションでは, 従来の方法でフォームデータを送信するのではなく,
サーバから取得したJavaScriptコードを使用しています.
このコードの詳細を理解することはまだ重要ではありませんが, 少し見ていきましょう.

```js
var form = document.getElementById('notes_form')
form.onsubmit = function(e) {
  e.preventDefault()

  var note = {
    content: e.target.elements[0].value,
    date: new Date(),
  }

  notes.push(note)
  e.target.elements[0].value = ''
  redrawNotes()
  sendToServer(note)
}
```

`document.getElementById('notes_form')`は, ページから`form`要素を取得し,
フォーム送信イベントを処理するためのイベントハンドラを登録するようにコードに指示します.
イベントハンドラはすぐに`e.preventDefault()`メソッドを呼び出し, フォーム送信のデフォルト処理を防ぎます.
デフォルトのメソッドはサーバにデータを送信し, 新しいGETリクエストを発生させますが, これは望ましくありません.

その後, イベントハンドラは新しいノートを作成し, それを`notes.push(note)`コマンドでノートリストに追加し,
ページ上のノートリストを再表示し, 新しいノートをサーバに送信します.

ノートをサーバに送信するためのコードは以下の通りです.

```js
var sendToServer = function(note) {
  var xhttpForPost = new XMLHttpRequest()
  // ...

  xhttpForPost.open('POST', '/new_note_spa', true)
  xhttpForPost.setRequestHeader(
    'Content-type', 'application/json'
  )
  xhttpForPost.send(JSON.stringify(note))
}
```

コードは, データがHTTP POSTリクエストで送信され,
データ型がJSONであることを決定します.
データ型は`Content-type`ヘッダーで決定されます.
次に, データはJSON文字列として送信されます.

アプリケーションコードは https://github.com/mluukkai/example_app で入手できます.
このアプリケーションはコースの概念を示すためだけのものであることを覚えておいてください.
このコードは, ある意味では悪い開発スタイルを踏襲しており,
独自のアプリケーションを作成する際のお手本として使用すべきではありません.
使用されているURLについても同じことが言えます.
新しいノートが送信されるURLである`new_note_spa`は,
現在のベストプラクティスに準拠していません.

## JavaScriptライブラリ
サンプルアプリケーションは, いわゆるvanilla Javascriptを使用して作成されており,
ページの構造を操作するためにDOM APIとJavaScriptのみを使用しています.

JavaScriptとDOM APIのみを使用するのではなく, DOM APIに比べて作業しやすいツールを含む
別のライブラリを使用してページを操作することがよくあります.
これらのライブラリの1つに, 今では最も定評があるJQueryがあります.

JQueryが開発されたのは, WebアプリケーションがHTMLページをサーバで生成するという従来のスタイルを主に踏襲していた頃で,
その機能は, JQueryで記述されたJavaScriptを使用してブラウザ側で拡張されました.
JQueryが成功した理由の1つは, いわゆるクロスブラウザ互換性でした.
ライブラリは, ブラウザやそれを作成したベンダーに依存せず機能したため,
ブラウザ毎への個別対応は必要ありませんでした.
今日では, VanillaJSの進化を考えるとJQueryを使うことはあまり正当化されておらず,
一般的なブラウザでは基本的な機能は十分にサポートされています.

シングルページアプリケーションの登場により, JQueryよりも「モダン」なWeb開発方法が生まれました.
第一波の開発者たちのお気に入りはBackboneJSでした.
2012年のリリース後, GoogleのAngularJSはすぐにモダンなWeb開発のデファクトスタンダードになりました.

しかし, 2014年10月にAngularチームがバージョン1のサポートを終了し,
Angular2はAngular1との下位互換性を持たないと発表した後, Angularの人気は急落しました.
Angular2とそれ以降のバージョンは, あまり歓迎されていません.

現在, Webアプリケーションのブラウザ側ロジックを実装するための最も人気のあるライブラリは, FacebookのReactです.
このコースでは, 共に頻繁に使用されるReactとReduxについて学びます.

Reactの地位は強いようにみえますが, JavaScriptの世界は常に変化しています.
たとえば, 最近, 新しいライブラリであるVueJSが注目を集めています.

## Full stack web development
このコースの名前である, Full stack web developmentとはどういう意味だろうか?
フルスタックは誰もが話題にするバズワードですが, それが何を意味するのか誰も分かっていません.
少なくとも, 合意された用語の定義はありません.

実質的には, すべてのWebアプリケーションには (少なくとも) 2つのレイヤーがあります.
エンドユーザに近いブラウザが最上層であり, サーバが最下層です.
また, サーバの下にはデータベース層があることもよくあります.
従って, Webアプリケーションのアーキテクチャは, アルシュのレイヤーの積み重ねと考えることができます.

よく, フロントエンドとバックエンドの話をすることもあります.
ブラウザがフロントエンドで, ブラウザ上で実行されるJavaScriptがフロントエンドのコードです.
一方, サーバはバックエンドです.

このコースの文脈では, Full stack web developmentとは,
アプリケーションのすべての部分 (フロントエンド, バックエンド, データベース)に焦点を当てることを意味しています.
時々, サーバ上のソフトウェアとそのオペレーティングシステムがスタックの一部とみなされることがありますが,
このコースではそれらについては触れません.

バックエンドのコーディングは, Node.jsのランタイム使用してJavaScriptにより行います.
スタックの複数のレイヤーで同じプログラミング言語を用いることで,
Full stack Web developmentに全く新しい次元がもたらされます.

以前は, 開発者がスタックのある一つの層, たとえばバックエンドに特化することが一般的でした.
バックエンドとフロントエンドの技術は全く異なっていました.
フルスタックのトレンドでは, 開発者はアプリケーションとデータベースの全てのレイヤーに精通していることが一般的になりました.
多くの場合, フルスタックエンジニアは,
例えばクラウドでアプリケーションを運用するために十分な設定や管理のスキルを持っていなければなりません.

## JavaScript疲れ
フルスタックウェブ開発は, 多くの点で挑戦的です.
一度に多くの場所で物事が起こり, デバッグは通常のデスクトップアプリケーションよりも非常に困難です.
JavaScriptは(他の多くの言語と比較して)常に期待通りに動作するとは限らず,
ラインタイム環境が非同期的に動作するため, 様々な問題が発生します.
Webでの通信には, HTTPプロトコルの知識が必須です.
また, データベースやサーバの管理・設定もしなければなりません.
アプリケーションを少なくともある程度見栄えの良いものにするためには, CSSを十分に知っておく必要もあります.

JavaScriptの世界は急速に発展しており, それ自体に一連の課題があります.
ツール, ライブラリ, 言語そのものは常に開発されています.
絶え間ない変化に飽き始めて, JavaScript疲れという用語を作り出した人もいます.

このコースでは, JavaScript疲れに悩まされます.
幸いにも, 学習曲線をスムーズにする方法はいくつかあり,
設定ではなくコーディングから始めることができます.
設定を完全に回避することはできませんが,
最悪の設定地獄を回避しながら, 次の数週間は陽気に前に進むことができます.

## Exercises 0.1.-0.6.
演習はGitHub経由で提出し, <a href="https://studies.cs.helsinki.fi/stats/courses/fullstackopen">提出システム</a>
で提出済みとして演習にマークをつけることで提出されます.

すべての演習を同じリポジトリに送信するか, 複数の異なるリポジトリを使用できます.
異なるPartの演習を同じリポジトリに送信する場合は, ディレクトリに適切な名前をつけてください.
プライベートリポジトリを使用して演習を提出する場合には, collaboratorとして`mluukkai`を追加してください.

提出リポジトリ内のディレクトリの名前をつける良い方法の一つは以下のようになります.

```
part0
part1
  courseinfo
  unicafe
  anecdotes
part2
  phonebook
  countries
```

したがって, 各パートには独自のディレクトリがあり, そこにはPart1のunicafe演習のように,
各演習セットのためのディレクトリが含まれています.

演習は<b>一度に1つずつ</b>提出されます.
あるパートの演習を提出した後は, そのパートの演習を追加で提出することはできません.


## 0.1: HTML
Mozillaの<a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics">HTMLチュートリアル</a>を読んでHTMLの基本を確認してください.

この演習はチュートリアルを読むだけで十分です.

## 0.2: CSS
Mozillaの<a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics">CSSチュートリアル</a>を読んでCSSの基本を確認してください.

この演習はチュートリアルを読むだけで十分です.

## 0.3: HTML forms
Mozillaの<a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form">HTML formチュートリアル</a>を読んでHTMLフォームの基本について学んでください.

この演習はチュートリアルを読むだけで十分です.

## 0.4: new note
JavaScriptを含むページの読み込み-改訂の節で, https://fullstack-exampleapp.herokuapp.com/notes
を開くことによって引き起こされた一連のイベントは, <a href="https://www.geeksforgeeks.org/unified-modeling-language-uml-sequence-diagrams/">シーケンス図</a>として描かれています.

この図は, <a href="https://www.websequencediagrams.com/">websequencediagrams</a>サービスを用いて次のように作成されました.

```
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
server-->browser: HTML-code
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
server-->browser: main.css
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server
end note

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

ユーザが https://fullstack-exampleapp.herokuapp.com/notes に新しいノートを作成し,
テキストフィールドに何かを書き込んで `Submit`ボタンをクリックするシーンを示す同様の図を作成してください.

必要に応じて, ブラウザ上やサーバ上の操作を図のコメントとして表示してください.

図はシーケンス図である必要はありません.
イベントを示すための賢明な方法があれば何でも構いません.

この演習を行うために必要な全ての情報と, 次の2つ演習は, このパートの本文に記載されています.
これらの演習のアイディアは, テキストをもう一度読み返して, どこで何が起こっているのかをしっかり考えることです.
アプリケーションのコードを読み解く必要はありませんが, もちろんそうしても問題ありません.

## 0.5 Single page app
ユーザが https://fullstack-exampleapp.herokuapp.com/spa のノートアプリのSPA版にアクセスした場合のシーンを表した図を作成してください.

## 0.6 New note
ユーザがSPA版のアプリケーションを使用して新しいメモを作成するシーンを表す図を作成してください.

これで最後の演習となりましたが, そろそろ自分の回答をGitHubにプッシュして, 提出システムで行った演習をマークしておきましょう.
