import React from 'react'
import { StatisticsLine } from './StatisticsLine'

export const Statistics = ({good, neutral, bad}) => {

    const all = ( good + neutral + bad )
    const average = (( good - bad ) / all)
    const positive = (( good / all ) * 100)

  return (
    <>
        <h1>statistics</h1>
        {all ?
        <table>
          <tbody>
            <StatisticsLine text='good' value={good}/>
            <StatisticsLine text='neutral' value={neutral}/>
            <StatisticsLine text='bad' value={bad}/>
            <StatisticsLine text='all' value={all}/>
            <StatisticsLine text='average' value={average}/>
            <StatisticsLine text='positive' value={positive} symbol='%' />
          </tbody>
        </table>
        :
        <div>
            <p>No feedback given</p>
        </div>
    }
        
    </>
  )
}
