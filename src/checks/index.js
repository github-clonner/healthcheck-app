const { each } = require('lodash')

const logger = require('../utils/logger')
const { formatLogz } = require('../utils/formatLogz')

const pingCheck = require('./ping')
const httpCheck = require('./http')
const postgresqlCheck = require('./postgresql')
const mongodbCheck = require('./mongodb')

function runChecks (config) {
  const { items } = config
  const logsPromisesContainer = []

  each(items, item => {
    switch (item.checkType) {
      case "http":
        logsPromisesContainer.push(httpCheck(item))
        break
      case "ping":
        logsPromisesContainer.push(pingCheck(item))
        break
      case "postgresql":
        logsPromisesContainer.push(postgresqlCheck(item))
        break
      case "mongodb":
        logsPromisesContainer.push(mongodbCheck(item))
        break
    }
  })

  function logSuccessPlease (logsPromises) {
    logsPromises.forEach(logz => {
      logger.log(logz.method, formatLogz(logz.data))
    })
  }

  Promise.all(logsPromisesContainer).then(logSuccessPlease)
    .catch(error => {
      logger.log('error', 'Error not catched by a service :')
      logger.log('error', error)
    })
}

module.exports = runChecks
