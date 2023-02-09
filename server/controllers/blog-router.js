const blogsRouter = require('express').Router()
const Blog = require('../models/blogilista-model')

const middleware = require('../middleware/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { nimi: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { body } = request

  // const token = getTokenFrom(request)
  // const decodedToken = jwt.verify(token, process.env.SECRET)

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // console.log(request.user.nimi)
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid - login to proceed' })
  }

  // const user = await User.findById(decodedToken.id)

  const user = await request.user

  // console.log('user id is '.concat(user._id))
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  const savedBlog = await blog.save()
  // Lisätään käyttäjänkin tietoihin viite lisättyyn blogiin
  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // console.log(request.user.nimi)
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // const user = await User.findById(decodedToken.id)
  const user = await request.user
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
  }
  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request

  const blog = {
    title: body.title,
    authort: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  return response.json(updatedNote)
})

module.exports = blogsRouter
