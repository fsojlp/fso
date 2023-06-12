import { createAnecdote } from './reducers/anecdoteReducer'
import { Anecdotes } from './components/Anecdotes'

const App = (props) => {

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
      <Anecdotes store={props.store} />
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