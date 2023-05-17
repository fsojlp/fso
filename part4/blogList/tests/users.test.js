const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)
const Users = require('../models/users')

test('verifies that making a POST request successfully creates a new user', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      name: "TestUser1",
      username: "test11P2",
      password: "asdf1234",
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
})
  
test('verifies that if the user not have a valid username, will not be added', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      name: "TestUser1",
      username: "te",
      password: "asdf1234",
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toStrictEqual(usersAtStart)
})

test('verifies that if the password not have the required length, will not be added', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      name: "TestUser1",
      username: "TestUser2",
      password: "as",
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toStrictEqual(usersAtStart)
})
  
test('verifies that if the user exist, will not be added', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      name: "TestUser1",
      username: "test11P1",
      password: "asdf1234",
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toStrictEqual(usersAtStart)
})

afterAll(() => {
  mongoose.connection.close()
})