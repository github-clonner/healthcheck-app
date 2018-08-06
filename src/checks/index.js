const logger = require('../utils/logger')
const { formatLogz } = require('../utils/formatLogz')

const pingCheck = require('./ping')
const httpCheck = require('./http')
const postgresqlCheck = require('./postgresql')
const mongodbCheck = require('./mongodb')

function runChecks (config) {
  const { items } = config
  const logsPromisesContainer = []

  for (var i = 0; i < items.length; i++) {
    switch (items[i].checkType) {
      case "http":
        logsPromisesContainer.push(httpCheck(items[i]))
        break
      case "ping":
        logsPromisesContainer.push(pingCheck(items[i]))
        break
      case "postgresql":
        logsPromisesContainer.push(postgresqlCheck(items[i]))
        break
      case "mongodb":
        logsPromisesContainer.push(mongodbCheck(items[i]))
        break
    }
  }

  function logSuccessPlease (logsPromises) {
    logsPromises.forEach(logz => {
      logger.log(logz.method, formatLogz(logz.data))
    })
  }

  function logErrorPlease (err) {
    logger.log('error', 'In runChecks catch function')
    logger.log('error', err)
  }

  Promise.all(logsPromisesContainer).then(logSuccessPlease, logErrorPlease)
}

module.exports = runChecks
