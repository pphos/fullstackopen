### 1.13*: anecdotes step2
アプリケーションを拡張して, 表示された逸話に投票できるようにしましょう.

<img src="https://fullstackopen.com/static/06f95cb43a18bd6429174200a8d17cff/14be6/19a.png">

注意: 各逸話への投票を, コンポーネントのstateの配列またはオブジェクトに格納します.
オブジェクトや配列のような複雑なデータ構造に格納されたstateを更新する正しい方法は,
stateのコピーを作成することであることを覚えておいてください.

次のようにオブジェクトのコピーを作成できます.

```js
const points = { 0: 1, 1: 3, 2: 4, 3: 2 }

const copy = { ...points }
// increment the property 2 value by one
copy[2] += 1
```

または次のようにできます.

```js
const points = [1, 4, 6, 3]

const copy = [...points]
// increment the value in position 2 by one
copy[2] += 1
```

この場合, 配列を使う方が簡単な選択かもしれません.
ググッてみると, <a href="https://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length/22209781">このように</a>任意の長さの初期値0の配列を作るヒントがたくさんでききます.
