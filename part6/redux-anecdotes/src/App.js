import { createAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    return {
      type: 'VOTE',
      data: { id }
    }
  }

  const addAnecdote = (e) => {
    e.preventDefault()

    const content = e.target.anecdote.value
    e.target.value = ''
    props.store.dispatch(
      createAnecdote(content)
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => props.store.dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type='text' name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App