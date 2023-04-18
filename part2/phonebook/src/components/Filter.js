import React from 'react'

export const Filter = ({handle}) => {
  return (
    <div>
        filter shown with <input onChange={handle}/>
    </div>
  )
}
