function formatLogz (data) {
  const defaultValues = {
    name: "N/A",
    checkType: "N/A",
    status: "N/A",
    statusMessage: "N/A",
    duration: -1
  }

  return Object.assign(defaultValues, data)
}

module.exports = {
  formatLogz
}
