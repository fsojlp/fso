import React from 'react'

export const UserInfo = ({ username, handleLogout }) => {
  return (
    <div>{username} has logged in <button onClick={handleLogout}>logout</button></div>
  )
}
