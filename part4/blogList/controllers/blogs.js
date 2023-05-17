const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (blogs) {
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const users = await User.find({})
  if (!body.title || !body.author || !body.url) {
    response.status(400).end()
  } else {
    const likes = body.likes ? body.likes : 0
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes,
      user: {
        id: users[0]._id,
        username: users[0].username,
        name: users[0].name
      }
    })

    const savedBlog = await blog.save()
    response.json(savedBlog)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (!body.title || !body.author || !body.url) {
    response.status(400).end()
  } else {
    const likes = body.likes ? body.likes : 0

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
    response.json(updatedBlog)
  }

})

module.exports = blogRouter
