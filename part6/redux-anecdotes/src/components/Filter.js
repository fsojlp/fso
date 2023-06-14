import React from 'react'
import { setFilter } from '../reducers/filterReducer'

export const Filter = ({ store }) => {
  const handleChange = (e) => {
    const myFilter = e.target.value

    store.dispatch(setFilter(myFilter))
  }

  const style = {
    marginBottom: 10
  }
  
  return (
    <div style={style}>
        Filter <input onChange={handleChange} />
    </div>
  )
}