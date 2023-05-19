import React from 'react'

export const LoginForm = ({ handleLogin, username, password, handleUsername, handlePassword }) => {
  return (
        <form onSubmit={handleLogin}>
            <h1>Log in to application</h1>
          <div>
            username <input type='text' value={username} id='Username' onChange={handleUsername} />
          </div>
          <div>
            password <input type='password' value={password} id='Password' onChange={handlePassword} />
          </div>
          <button type='submit'>login</button>
        </form>
  )
}