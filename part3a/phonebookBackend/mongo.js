const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }
  
const password = process.argv[2]

const url =
  `mongodb+srv://fso:${password}@cluster0.axsmnpz.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personsSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

const Persons = mongoose.model('Persons', personsSchema)

if(process.argv[3] && process.argv[3]){
  const person = new Persons({
    name: process.argv[3],
    number: process.argv[4],
  })
  
person.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('phonebook:')
  Persons.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
