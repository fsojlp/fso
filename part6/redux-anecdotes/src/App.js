import { createAnecdote } from './reducers/anecdoteReducer'
import { Anecdotes } from './components/Anecdotes'
import { AnecdoteForm } from './components/AnecdoteForm'

const App = (props) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes store={props.store} />
      <h2>create new</h2>
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App