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
    url: "https://jlpalacios.es",
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

test('verifies that if the likes property is missing from the request, it will default to 0', async () => {
  const newBlog = {
    title: "Test Blog 2",
    author: "11P",
    url: "https://jlpalacios.es"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
})

test('verifies that if the title and url properties of the requested data are missing, the backend responds with status code 400.', async () => {
  const newBlog = {
    author: "11P",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})