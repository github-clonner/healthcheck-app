const ping = require('ping')

const logger = require('../utils/logger')
const { formatLogz } = require('../utils/formatLogz')

function makePingRequest(requestObj) {
  const start = Date.now()
  const pingResponse = ping.promise.probe(requestObj.host)

  function success(response) {
    const status = response.alive

    const logz = formatLogz({
      name: requestObj.name,
      checkType: requestObj.checkType,
      status: status ? 'Alive' : 'Dead',
      duration: response.max
    })

    const method = status ? 'info' : 'error'
    return logger.log(method, logz)
  }

  function failure() {
    const end = Date.now() - start
    const logz = formatLogz({
      name: requestObj.name,
      checkType: requestObj.checkType,
      status: "Unreachable",
      duration: end
    })

    logger.log('error', logz)
  }

  return pingResponse.then(success, failure).catch(err => logger.log('error', err))
}

module.exports = makePingRequest
