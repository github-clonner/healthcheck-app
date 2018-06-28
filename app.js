const express = require('express')

const healthcheck = require('./checks')
const config = require('./config.local.js')
const logger = require('./utils/logger')

const app = express()
const { appPort, loopTime } = config

let looper

function startLoop () {
  looper = setInterval(() => healthcheck(config, logger), loopTime)
}

function stopLoop () {
  clearInterval(looper)
}

function startApp () {
  app.listen(appPort, () => {
    logger.log('info', `Healthcheck App Started.  Live at http://localhost/${appPort}.`)
    startLoop()
  })

  return app
}

module.exports = startApp()
