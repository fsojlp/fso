import React from 'react'
import { Heading } from './Heading'

export const Form = ({ submit, change1, change2 }) => {
  return (
    <>
    <Heading text='add a new' />
    <form onSubmit={submit}>
        <div>
          name: <input onChange={change1} id='inputName' required/>
        </div>
        <div>
          number: <input onChange={change2} id='inputNumber' required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
    </>
  )
}
