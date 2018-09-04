const ping = require('ping')

function makePingRequest(requestObj) {
  const start = Date.now()
  const pingResponse = ping.promise.probe(requestObj.host)

  function success(response) {
    const status = response.alive

    const logz = {
      method: status ? 'info' : 'error',
      data: {
        name: requestObj.name,
        checkType: requestObj.checkType,
        status: status ? 'Alive' : 'Dead',
        duration: parseFloat(response.max)
      }
    }

    return logz
  }

  function failure() {
    const logz = {
      method: 'error',
      data: {
        name: requestObj.name,
        checkType: requestObj.checkType,
        status: "Unreachable",
        duration: Date.now() - start
      }
    }

    return logz
  }

  return pingResponse.then(success, failure)
    .catch(err => ({ method: 'error', data: err }))
}

module.exports = makePingRequest
