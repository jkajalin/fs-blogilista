// before known as app.js blogilista
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
require('express-async-errors')
const config = require('./util/config')

const app = express()

const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blog-router')
const usersRouter = require('./controllers/users')
const middleware = require('./middleware/middleware')

// console.log('mongoose uri:', config.MONGODB_URI)
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// "/api" lisätään vasta juuren index.js:ssä masterissa
app.use('/login', loginRouter)
app.use('/blogs', blogsRouter)
app.use('/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testingRouter = require('./controllers/test-router')
  app.use('/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
