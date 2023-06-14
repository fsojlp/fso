import React from 'react'
import { Anecdote } from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

export const AnecdoteList = ({ store }) => {

  const voteHandler = (anecdote) => {
    store.dispatch(vote(anecdote))

    const notificationMessage = `Voted: ${anecdote.content.stoString()}`
    store.dispatch(createNotification(notificationMessage))

    setTimeout(() => {
      store.dispatch(removeNotification())
    }, 5000)
  }

  const { anecdotes, filter } = store.getState()

  const anecdotesToShow = () => {
    if (filter === 'ALL') {
      return anecdotes
    }

    return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
  }
  return (
    <ul>
      {anecdotesToShow().map(anecdote => 
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => voteHandler(anecdote)} />
      )}
    </ul>
  )
}