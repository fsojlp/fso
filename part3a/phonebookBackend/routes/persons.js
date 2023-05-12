const router = require('express').Router()
const personModel = require('../models/person')

router.get('/', async (request, response) => {
    const saved = await personModel.find()
    if (saved) {
        try {
            response.json({
                error:null,
                data:saved
            })
            next()
        } catch (error) {
            response.status(404).end()
        }
    }
})

router.get('/:id', async (request, response) => {
    personModel.findById(request.params.id)
    .then(person => {
            const nPerson = {
                name:person.name,
                number:person.number,
                id:person.id
            }
            response.json(nPerson)
    })
    .catch(error => {
        response.json({'error':error.message})   
    })
})

router.post('/', async (request, response, next) => {
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

    const person = new personModel({
        name: body.name,
        number: body.number
    })

    person.save()
    .then( result => {
        response.json({
            error:null,
            data:person
        })
    })
    .catch(error => next(error))
})

router.put('/:id', async (request, response, next) => {

    const idn = request.params.id
    await personModel.findByIdAndUpdate(idn, {number: request.body.number}, {new:true})
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error))
})

router.delete('/:id', (request, response, next) => {
    personModel.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})
module.exports = router