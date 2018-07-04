const { Client } = require('pg')
const { get } = require('lodash')

const logger = require('../utils/logger')
const { formatLogz } = require('../utils/formatLogz')

function makeDbRequest(requestObj) {
  const start = new Date()

  const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_DB, DATABASE_HOST, DATABASE_PORT } = requestObj
  const connectionString = `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}`

  const client = new Client({
    connectionString
  })

  function connectPromise () {
    return new Promise(function (resolve, reject) {
      client.connect(err => {
        return err ? reject(err) : resolve()
      })
    })
  }

  function queryPromise () {
    return new Promise(function (resolve, reject) {
      client.query('SELECT NOW()', (err, res) => {
        return err ? reject(err) : resolve(res)
      })
    })
  }

  function postgresqlSuccess(res) {
    const duration = new Date() - start
    const logz = formatLogz({
      name: requestObj.name,
      checkType: requestObj.checkType,
      status: get(res,'rows[0].now') ? 'Alive' : 'Dead',
      duration
    })

    return logger.log('info', logz)
  }

  function refused(err) {
    const duration = new Date() - start
    const logz = formatLogz({
      name: requestObj.name,
      checkType: requestObj.checkType,
      statusMessage: err.message,
      duration
    })

    return logger.log('error', logz)
  }

  return connectPromise()
    .then(queryPromise)
    .then(postgresqlSuccess)
    .then(() => {
      client.end()
    })
    .catch(refused)

}

module.exports = makeDbRequest
