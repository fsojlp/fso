import React from 'react'

export const Country = ({country}) => {
    let lang = []
    for (const [key, value] of Object.entries(country.languages)) {
        lang.push(value)
    }

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
    </div>
  )
}
