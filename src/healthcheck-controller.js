const http = require('./checks/http')
const config = require('./config.local')

const errorPage = require('./templates/error-page')

function controller (req, res) {
  http(config.items[1])
  .then(data => {
    if (data.method === 'info') {
      return res.status(500).send(errorPage)
    }
    return res.sendStatus(200)
  })
}

module.exports = controller
