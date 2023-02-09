const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./util/config')
require('express-async-errors')

const app = express()

const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blog-router')
const usersRouter = require('./controllers/users')
const middleware = require('./middleware/middleware')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testingRouter = require('./controllers/test-router')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
