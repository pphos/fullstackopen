import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(
    Array(props.anecdotes.length).fill(0)
  )

  const handleNextClick = () => {
    const min = 0
    const max = props.anecdotes.length - 1
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min

    setSelected(randomInt)
  }

  const handleVotes = () => {
    points[selected] += 1

    setPoints([...points])
  }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <div>
        <button onClick={handleVotes}>vote</button>
        <button onClick={handleNextClick}>next anecdote</button>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)