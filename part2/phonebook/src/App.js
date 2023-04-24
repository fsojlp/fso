import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';
import { Heading } from './components/Heading';
import { Filter } from './components/Filter';
import { Form } from './components/Form';
import { PhoneList } from './components/PhoneList';

function App() {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtered, setFiltered ] = useState(null)

  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }

  useEffect(hook, [])


  const addPerson = (e) => {
    e.preventDefault()
    let newPersons = [...persons]
    const exist = persons.filter(u => u.name === newName)
    exist.length >  0 
      ? 
        alert(`${newName} is already added to phonebook`) 
      :
        axios
          .post('http://localhost:3001/persons', {name: newName, number:newNumber})
          .then(response => {
            newPersons.push({name: newName, number:newNumber})
            setPersons(newPersons)
            setNewName('')
            document.getElementById('inputName').value=''
            document.getElementById('inputNumber').value=''
          })
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
      <Heading text='Phonebook' />
      <Filter handle={handleFilter} />
      <Form submit={addPerson} change1={newPerson} change2={newPhone} />
      <PhoneList persons={persons} filtered={filtered}/>
    </div>
  );
}

export default App;
