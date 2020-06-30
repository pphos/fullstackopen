import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const all = good + neutral + bad
  const average = all !== 0 ? (good - bad) / all : 0
  const positive = all !== 0 ? good / all * 100 : 0

  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      good {good} <br/>
      neutral {neutral} <br/>
      bad {bad} <br/>
      all {all} <br/>
      average {average} <br/>
      positive {positive} <br/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
