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

test('verifies that making a POST request successfully creates a new blog post', async () => {
  const newBlog = {
    title: "Test Blog",
    author: "11P",
    url: "hhtps://jlpalacios.es",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.list.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
})