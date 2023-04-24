import React from 'react'

export const List = ({toShow}) => {
  return (
    <div>
        {toShow.map(c => <p key={c.name.common}>{c.name.common}</p>)}
    </div>
  )
}
