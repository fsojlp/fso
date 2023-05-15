const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const list = helper.list
      .map(blog => new Blog(blog))
    const promiseArray = list.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('total blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.list.length)
})

test('unique identifier of each blog is "_id"', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(b => expect(b.id).toBeDefined())
})

afterAll(() => {
  mongoose.connection.close()
})