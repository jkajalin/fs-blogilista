const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { kayttajanimi, salasana } = request.body

  const user = await User.findOne({ kayttajanimi })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(salasana, user.salasanaHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.kayttajanimi,
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
  }

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 },
  )

  return response
    .status(200)
    .send({ token, kayttajanimi: user.kayttajanimi, nimi: user.nimi })
})

module.exports = loginRouter
