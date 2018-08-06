const ping = require('ping')

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

    return { method, logz }
  }

  function failure() {
    const end = Date.now() - start
    const logz = formatLogz({
      name: requestObj.name,
      checkType: requestObj.checkType,
      status: "Unreachable",
      duration: end
    })

    return { method: 'error', logz }
  }

  return pingResponse.then(success, failure)
    .catch(err => ({ method: 'error', logz: err }))
}

module.exports = makePingRequest
