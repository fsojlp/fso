import React from 'react'

export const Total = ({parts}) => {
  let total = 0
  parts.map(p=> total+=p.exercises)
  return (
    <div><b>Total of {total} exercises</b></div>
  )
}
