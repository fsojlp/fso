import React, { useState, useEffect } from 'react'
import './App.css';
import { Heading } from './components/Heading';
import { Filter } from './components/Filter';
import { Form } from './components/Form';
import { PhoneList } from './components/PhoneList';
import people from './services/persons';
import { Notification } from './components/Notification';

function App() {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtered, setFiltered ] = useState(null)
  const [ message, setMessage ] = useState(null)

  const hook = () => {
    people.getAll().then(returnedPersons => setPersons(returnedPersons.data))
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
      people.create(newPerson)
        .then(returnedPerson => {
          newPersons.push(newPerson)
          setPersons(newPersons)
          setNewName('')
          document.getElementById('inputName').value=''
          document.getElementById('inputNumber').value=''
          setMessage({text:`'${returnedPerson.name}' was added`,type:'success'})
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(error => {
          setMessage({text:`'${error.response.data.error}'`,type:'error'})
          setTimeout(() => {setMessage(null)}, 5000)
        })
  }

  const actualize = (person) => {
    const newUpdate = {name: person.name, number:newNumber}
    if(window.confirm(`${person.name} already exist. Update?`)){
      people.update(person._id, newUpdate)
      .then(returnedPerson => {
        const personsToUpdate = persons.filter(p => p.name !== returnedPerson.name)
        personsToUpdate.push(returnedPerson)
        setPersons(personsToUpdate)
        setNewName('')
        setNewNumber('')
        document.getElementById('inputName').value=''
        document.getElementById('inputNumber').value=''
        setMessage({text:`'${returnedPerson.name}' was updated`,type:'success'})
        setTimeout(() => {setMessage(null)}, 5000)
      })
      .catch(error => {
        setMessage({text:`'${error.response.data.error}'`,type:'error'})
        setTimeout(() => {setMessage(null)}, 5000)
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

  const handleDelete = (id, name) => {
    const newPersons = persons.filter(p => p._id !== id)
    console.log(newPersons)
    people.erase(id)
      .then(
        setPersons(newPersons),
        setMessage({text:`'Information of ${name}' has been removed`,type:'success'}),
        setTimeout(() => {setMessage(null)}, 5000)
      )
      .catch(error => {
       setMessage({text:`'Information of ${name}' has already removed`,type:'error'})
        setTimeout(() => {setMessage(null)}, 5000) 
      })
  }

  return (
    <div className="App">
      <Heading text='Phonebook' />
      <Notification content={message} />
      <Filter handle={handleFilter} />
      <Form submit={addPerson} change1={newPerson} change2={newPhone} />
      <PhoneList persons={persons} filtered={filtered} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
