import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Statistics } from './components/Statistics';
import { Button } from './components/Button';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => { setGood(good+1) }
  const handleNeutral = () => { setNeutral(neutral+1) }
  const handleBad = () => { setBad(bad+1) }

  return (
    <div>
      <h1>give feedback</h1>
      <Button action={handleGood} text='good'/>
      <Button action={handleNeutral} text='neutral'/>
      <Button action={handleBad} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);