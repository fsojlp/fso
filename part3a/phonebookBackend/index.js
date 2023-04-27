const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config();
app.use(express.json())
app.use(morgan(':method :url :status :res[content] - :response-time ms :date[web]'))
app.use(cors())
app.use(express.static('build'))

//handle mongoDB
    const url = process.env.MONGO_URL

    mongoose.connect(url)

    const personsSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Persons = mongoose.model('Persons', personsSchema)

//end handle mongoDB

/*let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
]*/

app.get('/info', (request, response)=> {
    const people = persons.length
    const date = new Date()
    response.send(`<p>Phonebook has info for ${people} people</p><p>${date.toString()}</p>`)
})

app.get('/', (request, response) => {
    response.send('<h1>Phonebook Backend</h1>')
})

app.get('/api/persons', (request, response) => {
    Persons.find({}).then(result => {response.json(result)})
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    return Math.floor(Math.random() * 1000) 
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(person)
    response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`) 
})