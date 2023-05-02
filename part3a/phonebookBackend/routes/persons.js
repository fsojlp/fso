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
            response.json(person)
    })
    .catch(error => {
        response.json({'error':error.message})   
    })
})

router.post('/', (request, response) => {
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

    try {
        const savedPerson = person.save()

        response.json({
            error:null,
            data:savedPerson
        })
        
    } catch (error) {
        response.status(400).json({error})
    }
})

module.exports = router