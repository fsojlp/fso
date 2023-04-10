import React from 'react'

export const Statistics = ({good, neutral, bad}) => {

    const all = ( good + neutral + bad )
    const average = (( good - bad ) / all)
    const positive = (( good / all ) * 100)

  return (
    <div>
        <h1>Statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average} </p>
        <p>positive {positive} %</p>
    </div>
  )
}
