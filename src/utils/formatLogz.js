const { get } = require('lodash')
const fs = require('fs')

const config = require('../config.local')
const logger = require('../utils/logger')

function formatLogz (data) {
  const defaultValues = {
    name: "N/A",
    checkType: "N/A",
    status: "N/A",
    statusMessage: "N/A",
    duration: -1
  }

  const enrichedLogz = Object.assign(defaultValues, data)

  logVersion(enrichedLogz)

  return enrichedLogz
}

function logVersion (logz) {
  if (!config.appVersion) {
    return logz
  }

  const { filePath, versionPath, releaseDatePath } = config.appVersion

  if (!(Boolean(filePath) || Boolean(versionPath))) {
    return logz
  }

  try {
    const file = requireJSON(filePath)
    const appVersion = get(file, versionPath)

    logz.appVersion = appVersion

    if (releaseDatePath) {
      const releaseDate = get(file, releaseDatePath)
      logz.releaseDate = releaseDate
    }

  } catch (error) {
    logger.log('error', 'Something was wrong with retrieving the app version from file')
  }
}

function requireJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

module.exports = {
  formatLogz
}


