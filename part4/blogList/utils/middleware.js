const Logger = require('./logger')

const requestLogger = (request, response, next) => {
  Logger.info('Method:', request.method)
  Logger.info('Path: ', request.path)
  Logger.info('Body: ', request.path)
  Logger.info('---')
  next()
}

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
  next()
}

const errorHandler = (error, request, response, next) => {
  Logger.error(error.message)

  if (error.name === 'CastError') {
    return response.satatus(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
    next()
  } else {
    next()
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}