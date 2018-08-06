const logger = require('../utils/logger')

const pingCheck = require('./ping')
const httpCheck = require('./http')
const postgresqlCheck = require('./postgresql')
const mongodbCheck = require('./mongodb')

function runChecks (config) {
  const { items } = config
  const logsContainer = []

  for (var i = 0; i < items.length; i++) {
    switch (items[i].checkType) {
      case "http":
        logsContainer.push(httpCheck(items[i]))
        break
      case "ping":
        logsContainer.push(pingCheck(items[i]))
        break
      case "postgresql":
        logsContainer.push(postgresqlCheck(items[i]))
        break
      case "mongodb":
        logsContainer.push(mongodbCheck(items[i]))
        break
    }
  }

  function logSuccessPlease (logs) {
    logs.forEach(data => {
      logger.log(data.method, data.logz)
    })
  }

  function logErrorPlease (err) {
    logger.log('error', 'In runChecks catch function')
    logger.log('error', err)
  }

  Promise.all(logsContainer).then(logSuccessPlease, logErrorPlease)
}

module.exports = runChecks
