import React, { useState, useEffect } from 'react'
import './App.css';
import { Heading } from './components/Heading';
import { Filter } from './components/Filter';
import { Form } from './components/Form';
import { PhoneList } from './components/PhoneList';
import people from './services/persons';

function App() {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtered, setFiltered ] = useState(null)

  const hook = () => {
    people.getAll().then(returnedPersons => setPersons(returnedPersons))
  }
  useEffect(hook, [])


  const addPerson = (e) => {
    e.preventDefault()
    let newPersons = [...persons]
    const exist = persons.filter(u => u.name === newName)
    const newPerson = {name: newName, number:newNumber}
    exist.length >  0 
      ?
      actualize(exist[0])
      :
      people.create(newPerson).then(returnedPerson => {
        newPersons.push(returnedPerson)
        setPersons(newPersons)
        setNewName('')
        document.getElementById('inputName').value=''
        document.getElementById('inputNumber').value=''
      })
  }

  const actualize = (person) => {
    const newUpdate = {name: person.name, number:newNumber}
    if(window.confirm(`${person.name} already exist. Update?`)){
      console.log(person.id)
      people.update(person.id, newUpdate).then(returnedPerson => {
        const personsToUpdate = persons.filter(p => p.name !== returnedPerson.name)
        personsToUpdate.push(returnedPerson)
        setPersons(personsToUpdate)
      })
    }else{
      setNewName('')
      setNewNumber('')
      document.getElementById('inputName').value=''
      document.getElementById('inputNumber').value=''
    }
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

  const handleDelete = (id) => {
    const newPersons = persons.filter(p => persons.id !== id)
    people.erase(id).then(
      setPersons(newPersons)
    )
  }

  console.log(persons)
  return (
    <div className="App">
      <Heading text='Phonebook' />
      <Filter handle={handleFilter} />
      <Form submit={addPerson} change1={newPerson} change2={newPhone} />
      <PhoneList persons={persons} filtered={filtered} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
