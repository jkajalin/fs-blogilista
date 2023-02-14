// blogilista api serverin alkuperäinen index.js
const http = require('http')
const serverapp = require('./server/index') // varsinainen Express-sovellus, alkuperäisessä versiossa app.js

const config = require('./server/util/config')
const logger = require('./server/util/logger')

const server = http.createServer(serverapp)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
