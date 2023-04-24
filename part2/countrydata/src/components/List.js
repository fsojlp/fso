import React from 'react'

export const List = ({toShow, handleShow}) => {
  return (
    <div>
        {toShow.map(c => <p key={c.name.common}>{c.name.common} <button onClick={() => handleShow(c.name.common)}>show</button></p>)}
    </div>
  )
}
