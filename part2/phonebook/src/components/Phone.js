import React from 'react'

export const Phone = ({ x, handleDelete }) => {
  return (
    <p key={x.name}>{x.name} {x.number} <button onClick={() => {if (window.confirm(`Delete ${x.name}`)) handleDelete(x._id, x.name)}}>delete</button></p>
  )
}
