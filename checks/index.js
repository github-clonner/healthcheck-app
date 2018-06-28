const logger = require('../utils/logger')

const pingCheck = require('./ping')
const httpCheck = require('./http')
const postgresqlCheck = require('./postgresql')
// const mongodbCheck = require('./mongodb')

function runChecks (config) {
  const items = config.items

  try {
    for (var i = 0; i < items.length; i++) {
      if (items[i].checkType === "http") {
        httpCheck(items[i])
      }
      if (items[i].checkType === "ping") {
        pingCheck(items[i])
      }
      if (items[i].checkType === "postgresql") {
        postgresqlCheck(items[i])
      }
      if (items[i].checkType === "mongodb") {
        // mongodbCheck(items[i])
      }
    }

  } catch (err) {
    logger.log('error', 'In runChecks catch function')
    logger.log('error', err)
  }
}

module.exports = runChecks
