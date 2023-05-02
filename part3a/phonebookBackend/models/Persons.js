const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 2,
        max: 25
    },
    number: {
        type: String,
        require: true,
        min: 2,
        max: 25
    }
})

module.exports = mongoose.model('Person', personSchema)