import React, { useState } from 'react'
import './App.css';

function App() {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtered, setFiltered ] = useState(null)


  const addPerson = (e) => {
    e.preventDefault()
    let newPersons = [...persons]
    const exist = persons.filter(u => u.name === newName)
    exist.length >  0 
      ? 
        alert(`${newName} is already added to phonebook`) 
      :
        newPersons.push({name: newName, number:newNumber})
        setPersons(newPersons)
        setNewName('')
        document.getElementById('inputName').value=''
        document.getElementById('inputNumber').value=''
  }

  const newPerson = (e) => {
    setNewName(e.target.value)
  }

  const newPhone = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    const newfilter = persons.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFiltered(newfilter)

  }
  console.log(persons)
  return (
    <div className="App">
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={newPerson} id='inputName' required/>
        </div>
        <div>
          number: <input onChange={newPhone} id='inputNumber' required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {!filtered ? persons.length 
        ? 
          persons.map(p => <p key={p.name}>{p.name} {p.number}</p>) 
        : 
          <p>No persons</p>
        :
        filtered.map(f => <p key={f.name}>{f.name} {f.number}</p>)
      }
    </div>
  );
}

export default App;
