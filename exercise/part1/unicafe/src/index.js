import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  let [average, positive] = [0, 0]

  if (all !== 0) {
    average = (good - bad) / all
    positive = good / all * 100
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>statistics</h2>
      <p>
        good {good} <br/>
        neutral {neutral} <br/>
        bad {bad} <br/>
        all {all} <br/>
        average {average} <br/>
        positive {positive} % <br/>
      </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
