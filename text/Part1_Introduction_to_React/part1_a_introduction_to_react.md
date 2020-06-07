# Introducation to React

このコースでは, おそらく最も重要なトピックである<a href="https://reactjs.org/">Reactライブラリ</a>について理解を深めていきましょう.
まずは簡単なReactアプリケーションを作ることから始め, Reactのコアな概念を知ることから始めましょう.

これまでのところ, Reactを始める最も簡単な方法は, `create-react-app`というツールを使うことです.
Nodeとともにインストールされた`npm`のバージョンが5.3以上であれば,
マシンに`create-react-app`をインストールすることが可能です. (ただし必須ではありません)

`part1`というアプリケーションを作成して, そのディレクトリに移動しましょう.

```bash
$ npx create-react-app part1
$ cd part1
```

ここでも今後でも, `$`で始まるすべてのコマンドは, コマンドラインに入力されます.
`$`の文字はプロンプトを表すため, 入力しないでください.

アプリケーションは次のコマンドで実行されます.

```bash
$ npm start
```

デフォルトでは, アプリケーションは http://localhost:3000 というアドレスのlocalhostの3000番ポートで実行されます.

上記のコマンドを実行するとChromeが自動で起動するはずです.
すぐにブラウザコンソールを開いてください.
また, テキストエディタを開いて, Webページとコードを同時に表示できるようにしましょう.

<img src="https://fullstackopen.com/static/182fc3f16b4e18cf968de9bbd7efa653/14be6/1e.png">

アプリケーションのコードは`src`フォルダにあります.
`index.js`の内容が次のようになるように, デフォルトのコードを単純化しましょう.

```js
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

`App.js`, `App.css`, `App.test.js`, `logo.svg`, `setupTest.js`, `serviceWorker.js`のファイルは,
現在のアプリケーションでは不要なので削除することができます.



