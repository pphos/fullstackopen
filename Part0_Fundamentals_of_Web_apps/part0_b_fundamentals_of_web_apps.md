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

### CSS