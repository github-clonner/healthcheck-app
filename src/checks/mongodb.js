const MongoClient = require('mongodb').MongoClient

const { formatLogz } = require('../utils/formatLogz')

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
    const end = Date.now() - start

    const logz = formatLogz({
      name: requestObj.name,
      checkType: requestObj.checkType,
      status: 'Alive',
      duration: end
    })

    return { method: 'info', logz }
  }

  function failure (err) {
    const end = Date.now() - start

    const logz = formatLogz({
      name: requestObj.name,
      checkType: requestObj.checkType,
      status: "Dead",
      statusMessage: err.message,
      duration: end
    })

    return { method: 'error', logz }
  }

  return checkMongo(requestObj)
    .then(success, failure)
}

module.exports = makeDbRequest
