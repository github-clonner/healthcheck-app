const https = require('https')
const http = require('http')

const logger = require('../utils/logger')
const { formatLogz } = require('../utils/formatLogz')

function makeHttpRequest(requestObj) {
  const start = Date.now()

  const httpMethod = requestObj.ssl ? https : http
  const { host, port, path, expectedStatusCodes} = requestObj

  const request = httpMethod.get({ host, port, path }, res => {
    const end = Date.now() - start
    const logz = formatLogz({
      name: requestObj.name,
      checkType: requestObj.checkType,
      status: res.statusCode,
      statusMessage: res.statusMessage,
      duration: end
    })

    const isStatusExpected = expectedStatusCodes.indexOf(res.statusCode) >= 0
    const method = isStatusExpected ? 'info' : 'error'

    logger.log(method, logz)
  })

  request.on('error', function (err) {
    error(err)
  })

  function error(err) {
    const end = Date.now() - start
    const logz = formatLogz({
      name: requestObj.name,
      checkType: requestObj.checkType,
      status: err.statusCode,
      statusMessage: err.message,
      duration: end
    })

    logger.log('error', logz)
  }

}

module.exports = makeHttpRequest
