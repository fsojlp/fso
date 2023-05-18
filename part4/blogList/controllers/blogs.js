const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

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
  // eslint-disable-next-line no-undef
  if (!request.headers.authorization) {
    return response.status(401).json({ error: 'token missing' })
  }

  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!body.title || !body.author || !body.url) {
    response.status(400).end()
  } else {
    const likes = body.likes ? body.likes : 0
    // eslint-disable-next-line no-undef
    const decodedUser = jwt.verify(request.user, process.env.SECRET)
    const user = await User.findById(decodedUser.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }else {
    // eslint-disable-next-line no-undef
    const decodedUser = jwt.verify(request.user, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      if(blog.user.toString() === decodedUser.id){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    } else {
      response.status(404).end()
    }
  }
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