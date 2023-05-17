const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if(!body.password){response.status(400).send('error: a valid password is required')}
  if(body.password.length < 3){
    response.status(400).json({error:'password is shorter than the minimun allowed length'})
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

module.exports = usersRouter