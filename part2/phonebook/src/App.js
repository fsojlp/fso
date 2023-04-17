import React, { useState } from 'react'
import './App.css';

function App() {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas', number: '040-1234567' }])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


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

  return (
    <div className="App">
      <h2>Phonebook</h2>
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
      {persons.length 
        ? 
          persons.map(p => <p key={p.name}>{p.name} {p.number}</p>) 
        : 
          <p>No persons added</p>
      }
    </div>
  );
}

export default App;
