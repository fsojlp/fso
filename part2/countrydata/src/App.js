import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchForm } from './components/SearchForm';
import { Main } from './components/Main';

function App() {

  const [countries, setCountries] = useState([])
  const [toShow, setToShow] = useState([])


  const getCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }

  useEffect(getCountries, [])

  const handleInput = (e) => {
    if(e.target.value === ''){
      setToShow([])
    } else {
      const filtered = countries.filter(c => c.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
      setToShow(filtered) 
    }
  }

  const handleShow = (e) => {
    console.log(e)
    const filtered = countries.filter(c => c.name.common === e)
    setToShow(filtered)
  }

  return (
    <div className="App">
      <SearchForm handleInput={handleInput} />
      <Main toShow={toShow} handleShow={handleShow}/>
    </div>
  );
}

export default App;
