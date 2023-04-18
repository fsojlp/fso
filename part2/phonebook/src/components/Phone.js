import React from 'react'

export const Phone = ({ x }) => {
  return (
    <p key={x.name}>{x.name} {x.number}</p>
  )
}
