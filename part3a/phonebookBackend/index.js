const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const personsRoutes = require('./routes/persons')
app.use(express.json())
app.use(morgan(':method :url :status :res[content] - :response-time ms :date[web]'))
app.use(cors())

require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGO_URL
mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('conectado a base de datos')
    })
    .catch((e)=> {
        console.log('Database error', e)
    })
module.exports = {url, mongoose}


app.get('/', (request, response) => {
    response.send('<h1>Phonebook Backend</h1>')
})

app.use('/api/persons', personsRoutes)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`) 
})