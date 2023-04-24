import React from 'react'
import { Country } from './Country';
import { List } from './List';

export const Main = ({toShow, handleShow, getWeather, weather}) => {

  let message = ''
  if (toShow.length === 0) {
    message = 'Please, type a country';
  } else if (toShow.length > 10) {
    message = 'there are a lot of countries. Please, be more specific.'
  }

  return (
    <div>
      {message}
      {toShow.length === 1 ? 
        <Country country={toShow[0]} getWeather={getWeather} weather={weather}/> 
      : 
        toShow.length <= 10 ?
          <List toShow={toShow} handleShow={handleShow} />
        :
        <></>
      }
    </div>
  )
}
