import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = ({anecdotes, points}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(points)

  const random = () => {
    const rand = Math.floor(Math.random() * 6)
    selected === rand 
    ?
    random()
    :
    setSelected(rand)
  }

  const vote = () => {
    let copy = {...votes}
    copy[selected] ? copy[selected] += 1 : copy[selected] = 1
    setVotes(copy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] ? votes[selected] : 0} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={random}>next anecdote</button>
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

const points = { 0: 1, 1: 3, 2: 4, 3: 2 }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} points={points} />
  </React.StrictMode>
);