import React from 'react'

export const StatisticsLine = ({ text , value, symbol }) => {
  return (
    <p>{text} {value} {symbol}</p>
  )
}
