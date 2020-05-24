# 概要
このコースは, Javascriptを使ったモダンなWeb開発の入門コースです.
主にReactを用いたシングルページアプリケーションの実装や,
Node.jsを用いたRESTfullやGraphQLをサポートするWebサービスの実装に焦点を当てています.
2020年にはTypeScriptに関するパートが新たに追加されました.

その他のトピックには, アプリケーションのデバッグ, 設定, ランタイム環境の管理, NoSQLデータベースなどがあります.

## 前提条件
参加者には, 優れたプログラミングスキル, Webプログラミングやデータベースの基礎知識, バージョン管理システムGitの基本的な操作方法を知っていることが求められます.
また, 根気強く, 主体的な問題解決能力や情報探索能力が求められます.

JavaScriptやその他のコースのトピックに関する予備知識は必要ありません.

## コース教材
コース教材は, 一度に1つのパートを読んで, 各パートを最後まで読んでから次のパートに進むことを目的としています.

教材には演習問題が含まれており, 各演習問題を解くのに十分な情報が先行するように配置されています.
教材の中に演習問題を見つけるたびに問題を解いていってもいいですし, パートのすべての教材を読んでから問題を解いても構いません.

コースの多くの部分では, 演習では1つの大きなアプリケーションを1つずつ小さなピースで構築していきます.
演習のアプリケーションの中には, 複数のパートを通して開発されるものもあります.

教材は, パートごとに変化するアプリケーションの例を少しずつ拡大していきます.
個別に小さな変更を加えながらコードを追っていくことがよい学び方でしょう.
各パートの各ステップのアプリケーションのサンプルコードは<a href="https://github.com/fullstack-hy2020">GitHub</a>にあります.

## 講座
コースには10のパートが含まれ, 最初のパートは歴史的な理由により0と番号がつけられています.
各パートは, だいたい1週間 (平均15 ~ 20時間)の学習に対応しますが, コースを完了するスピードは柔軟に変えることができます.

パートnからパートn+1に進むことは, パートnのトピックについて十分に理解していない間は, 賢明ではありません.
教育学的な用語では, このコースは<a href="https://en.wikipedia.org/wiki/Mastery_learning">習得学習</a>を採用しており,
前のパートの練習問題を十分にこなした後にのみ次のパートに進むことを意図しています.

少なくとも, アスタリスク(*)が付いていない問題はすべて行うことが求められます.
アスタリスクが付いている問題は最終評価にカウントされますが, それをスキップしても次のパートの必修問題を解く妨げにはなりません.

コースを完了させるペースは非常に柔軟で, 2021年1月10日23:59 EETまでエクササイズを提出できます.

このコースのさまざまな部分ですてに提出された演習ようした時間の統計は, <a href="https://studies.cs.helsinki.fi/stats/courses/fullstackopen">提出システム</a>で確認できます.

## 評価
提出した演習の数に応じて, 3単位分の短めのコースとして受講することも, 5~9単位分のフルコースとして受講することもできます.

単位数と最終評価は, アスタリスクが付いていないものも含めて, 提出された演習問題の数によって決定されます.

大学の単位を希望する場合は, 最終成績にはカウントされませんが, 合格しなければならない試験もあります.
<a href="https://courses.helsinki.fi/en/aytkt21009en/131840261">Open UniversityM</a>が提供する大学の単位を<a href="https://fullstackopen.com/en/part0/general_info/#sign-up-for-the-exam">登録</a>するには,
フィンランドの社会保証番号が必要です.

演習問題を十分に完了して合格基準に達したら, 提出システムからコース修了証をダンロードすることができます.
これにはフィンランドの社会保証番号は必要ありません.

### 3単位
3単位の場合, Part 0~3のすべての演習問題(アスタリスクなし)を提出する必要があります.

コースの証明証を取得するために, コース試験に参加したり, Open Universityコースに登録したりする必要はありません.

### 5~7単位
5~7単位の場合, 単位数と評価はPart0-7の提出課題(アスタリスクのついた課題を含む)の合計数に基づきます.

単位数と成績は次のように計算されます.
| 演習問題 | 単位数 | 評価 |
|:---:|:---:|:---:|
|138 |7 |5 |
|127 |6 |5 |
|116 |5 |5 |
|105 |5 |4 |
|94  |5 |3 |
|83  |5 |2 |
|72  |5 |1 |

コースの証明証を取得するために, コース試験に参加したり, Open Universityコースに登録したりする必要はありません.

### 8~9単位
Part8「GraphQL」の演習問題のうち, 少なくとも22/26以上を提出することで, 追加で1単位を取得することができます.
Part8は, Part6, Part7とは内容が独立しているため, Part5の後にいつでも行うことができます.

Part9「TypeScript」の演習問題のうち, 少なくとも24/27の問題を提出することで, 追加で1単位を取得することができます.
Part9を受講する前に, Part0~7を修了しておくことを推奨します.

Part8およびPart9の演習は, 5~7単位コースの成績にはカウントされません.


## コース修了証
試験のためにOpen Universityに登録していなくても, 合格点のための十分な演習を終えれば,
<a href="https://studies.cs.helsinki.fi/stats/courses/fullstackopen">提出システム</a>からコース修了証をダウンロードすることができます.
修了証の取得にはフィンランドの社会保証番号は必要ありません.

## 演習問題の提出
演習はGitHub経由で提出し, <a href="https://studies.cs.helsinki.fi/stats/courses/fullstackopen">提出システム</a>上で
完了としてマークされます.

異なるパートから同じリポジトリに演習問題を提出する場合,
ディレクトリに名前をつけるために適切なシステムを使用してください.
もちろん, パーツごとに新しいリポジトリを作成できます.
プライベートリポジトリを使用している場合は, <i>mluukkai</i>をコラボレータとして追加します.

演習は一度に1つずつ提出されます.
一度あるパートの演習を提出すると, そのパートの演習は送信できなくなります.

GitHubに投稿された演習問題をチェックするために, 盗作を検出するシステムを利用しています.
模範解答からコードが見つかった場合や, 複数の学生が同じコードを提出した場合は, ヘルシンキ大学の<a href="https://guide.student.helsinki.fi/en/article/what-cheating-and-plagiarism">盗作に関するポリシー</a>に基づいて処理されます.

多くの演習では, 少しずつ大きなアプリケーションを構築していきます.
このような場合, 完成したアプリケーションだけ提出すれば十分です.
各演習の後にコミットしても構いませんが, 強制ではありません.

## コースをはじめる前に
このコースでは, Web開発に最適なツールを提供するため, ブラウザに<a href="https://www.google.com/chrome/">Chrome</a>を利用することを推奨します.
別の代替ブラウザとしては<a href="https://www.mozilla.org/en-US/firefox/developer/">Developer Edition of Firefox</a>があります.

コースの演習はGitHubに提出するので, Gitがインストールされている必要があり, 使い方を知っている必要があります.
Gitの使い方は<a href="https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners">こちらのチュートリアル</a>
に記載されています.

Web開発に対応したテキストエディタをインストールしてください.
<a href="https://code.visualstudio.com/">Visual Studio Code</a>がとてもおすすめです.

nano, メモ帳, geditでコーディングしないでください.
NetBeansもWeb開発にはあまり向いていません.
また, Visual Studio Codeに比べて非常に重いです.

<a href="https://nodejs.org/en/">Node.js</a>もインストールしましょう.
この教材はバージョン10.18で行っているので, それより古いものはインストールしないようにしましょう.
インストールの方法は<a href="https://nodejs.org/en/download/package-manager/">こちら</a>です.

Nodeパッケージマネージャの<a href="https://www.npmjs.com/get-npm">npm</a>はNode.jsと一緒に自動的にインストールされます.
講座中はnpmを積極的に使っていきます.
Nodeには<a href="https://www.npmjs.com/package/npx">npx</a>も付属していますが, これも何度か必要になるでしょう.