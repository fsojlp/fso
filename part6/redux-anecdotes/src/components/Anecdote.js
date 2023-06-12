import React from 'react'

export const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
        </div>
    </>
  )
}