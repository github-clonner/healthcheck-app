const mongoose = require('mongoose')
const logger = require('../utils/logger')

function makeDbRequest(requestObj) {
  logger.log('info', 'db skfugiu')
  const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_DB, DATABASE_HOST, DATABASE_PORT } = requestObj

  const connectionString = `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}`

}

module.exports = makeDbRequest





/*
function checkMongo (client) {
  return new Promise(function (resolve, reject) {
    client.collection('system.indexes').findOne({}, function (err, res) {
      if (err) return reject(err)
      resolve()
    })
  })
}

function checkElasticsearch (client) {
  return new Promise(function (resolve, reject) {
    client.ping({
      requestTimeout: 3000,
      hello: 'elasticsearch!'
    }, function (err, res) {
      if (err) return reject(err)
      return resolve()
    })
  })
}



mongoose.connection.db.admin().ping(function (err, result) {
  if (err || !result)
    return next(err || new Error('no ping result'))
  if (!req.accepts('txt') && req.accepts('json'))
    return res.json({ ping: 'PONG' })
  res.type('txt')
  res.send('PONG')
})
*/
