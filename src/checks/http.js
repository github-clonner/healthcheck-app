const https = require('https')
const http = require('http')

function makeHttpRequest(requestObj) {
  const start = Date.now()

  const httpMethod = requestObj.ssl ? https : http
  const { host, port, path, expectedStatusCodes} = requestObj

  return new Promise(function (resolve, reject) {
    const request = httpMethod.get({ host, port, path }, res => {
      const isStatusExpected = expectedStatusCodes.indexOf(res.statusCode) >= 0

      const logz = {
        method: isStatusExpected ? 'info' : 'error',
        data: {
          name: requestObj.name,
          checkType: requestObj.checkType,
          status: res.statusCode,
          statusMessage: res.statusMessage,
          duration: Date.now() - start
        }
      }

      resolve(logz)
    })

    function error(err) {
      const logz = {
        method: 'error',
        data: {
          name: requestObj.name,
          checkType: requestObj.checkType,
          status: err.statusCode,
          statusMessage: err.message,
          duration: Date.now() - start
        }
      }

      reject(logz)
    }

    request.on('error', function (err) {
      error(err)
    })
  })
}

module.exports = makeHttpRequest
