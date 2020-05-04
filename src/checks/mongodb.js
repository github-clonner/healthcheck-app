const MongoClient = require('mongodb').MongoClient

function checkMongo({ DATABASE_DB, DATABASE_HOST, DATABASE_PORT }) {
  const connectionString = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}`
  const connectionOption = {
    useNewUrlParser: true
  }

  return new Promise(function (resolve, reject) {
    MongoClient.connect(connectionString, connectionOption, (err, client) => {
      if (err) {
        return reject(err)
      }

      const adminDb = client.db(DATABASE_DB).admin()

      return adminDb.ping({}, (err, res) => {
        client.close()

        if (err || !res) {
          return reject(err)
        }

        return resolve(res)
      })
    })
  })
}

function makeDbRequest(requestObj) {
  const start = Date.now()

  function success () {
    const logz = {
      method: 'info',
      data: {
        name: requestObj.name,
        checkType: requestObj.checkType,
        status: 'Alive',
        duration: Date.now() - start
      }
    }

    return logz
  }

  function failure (err) {
    const logz = {
      method: 'error',
      data: {
        name: requestObj.name,
        checkType: requestObj.checkType,
        status: "Dead",
        statusMessage: err.message,
        duration: Date.now() - start
      }
    }

    return logz
  }

  return checkMongo(requestObj)
    .then(success)
    .catch(failure)
}

module.exports = makeDbRequest
