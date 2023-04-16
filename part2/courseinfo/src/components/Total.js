import React from 'react'

export const Total = ({parts}) => {
  const total = parts.reduce((s, p) => s + p.exercises,0)
  return (
    <div><b>Total of {total} exercises</b></div>
  )
}
