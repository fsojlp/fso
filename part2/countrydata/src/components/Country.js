import React, { useEffect, useState } from 'react'

export const Country = ({country, getWeather, weather}) => {
    let lang = []
    for (const [key, value] of Object.entries(country.languages)) {
        lang.push(value)
    }
const con = () => {
  getWeather(country.capital[0])
}
useEffect(con, [])

console.log('tiempo', weather)
  return (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
            {lang.map(l => <li key={l}>{l}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        {weather.length > 0 ?
        <div>
        <h2>weather in {country.capital[0]}</h2>
        <p>temperature: {weather.current.temperature} Celsius</p>
        <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions[0]} />
        <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </div>
        :
        <p>no weather information available.</p>
      }
        </div>
  )
}
