const http = require('./checks/http')
const config = require('./config.local')

const errorPage = require('./templates/error-page')

const { checkByUrl } = config

function controller (req, res) {
  if (!checkByUrl) {
    return res.status(501).send('This service is not yet setup. Add the key "checkByUrl" in your healthcheck config file.')
  }

  http(config.items[checkByUrl])
  .then(data => {
    if (data.method !== 'info') {
      return res.status(500).send(errorPage)
    }
    return res.sendStatus(200)
  })
}

module.exports = controller
