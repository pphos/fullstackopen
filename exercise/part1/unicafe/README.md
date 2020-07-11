### 1.11*: unicafe step6
統計をHTMLの`table`を用いて表示すると, アプリケーションはだいたい次のようになります.

<img src="https://fullstackopen.com/static/a74acccc17aafb02b3801ffa1fcc0fdc/14be6/16e.png">

常にコンソールを開いたままにしておいてください.
コンソールに次のような警告が表示された場合,

<img src="https://fullstackopen.com/static/d6f948307449c2673f28f1077ef4d789/14be6/17a.png">

次に, 警告を消すために必要なアクションを実行しましょう.
行き詰まった場合は, エラーメッセージをグーグルで検索しましょう.

典型的なエラーの発生源: `Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.`はChrome拡張です.
`chrome://extensions/`に移動して, 1つずつ無効化してReactアプリケーションのページを更新してみてください.
エラーは最終的には消えます.

今度, コンソール警告が表示されないことを確認してください.
