const logger = require('../utils/logger')

const pingCheck = require('./ping')
const httpCheck = require('./http')
const postgresqlCheck = require('./postgresql')
const mongodbCheck = require('./mongodb')

function runChecks (config) {
  const items = config.items

  try {
    for (var i = 0; i < items.length; i++) {
      switch (items[i].checkType) {
        case "http":
          httpCheck(items[i])
          break
        case "ping":
          pingCheck(items[i])
          break
        case "postgresql":
          postgresqlCheck(items[i])
          break
        case "mongodb":
          mongodbCheck(items[i])
          break
      }
    }

  } catch (err) {
    logger.log('error', 'In runChecks catch function')
    logger.log('error', err)
  }
}

module.exports = runChecks
