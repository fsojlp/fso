import React from 'react'
import { Heading } from './Heading'
import { Phone } from './Phone'

export const PhoneList = ({ filtered, persons }) => {
  return (
    <>
    <Heading text='Numbers' />
        {
            !filtered ? persons.length 
                ? 
                persons.map(p => <Phone key={p.name} x={p} />) 
                : 
                <p>No persons</p>
                :
            filtered.map(f => <Phone key={f.name} x={f} />)
      }
    </>
  )
}
