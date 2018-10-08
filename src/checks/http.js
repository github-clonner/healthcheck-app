const https = require('https')
const http = require('http')

function makeHttpRequest(requestObj) {
  const start = Date.now()

  const httpMethod = requestObj.ssl ? https : http
  const { host, port, path, expectedStatusCodes} = requestObj

  const promisifiedXhr = new Promise(function (resolve, reject) {
    const request = httpMethod.get({
      host,
      port,
      path,
      rejectUnauthorized: false
    }, res => {
      const isStatusExpected = expectedStatusCodes.indexOf(res.statusCode) >= 0

      const logz = {
        method: isStatusExpected ? 'info' : 'error',
        data: {
          name: requestObj.name,
          checkType: requestObj.checkType,
          status: JSON.stringify(res.statusCode),
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
          statusMessage: err.message,
          duration: Date.now() - start
        }
      }

      reject(logz)
    }

    request.on('error', function (err) {
      return error(err)
    })
  })

  return promisifiedXhr
    .catch(err => {
      return err
    })
}

module.exports = makeHttpRequest
