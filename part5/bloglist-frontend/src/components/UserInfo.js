import React from 'react'

export const UserInfo = ({ username, handleLogout }) => {
  return (
    <div>{username} has logged in <button onClick={handleLogout} id='Logout'>logout</button></div>
  )
}
