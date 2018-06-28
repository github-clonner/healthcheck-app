function formatLogz (data) {
  const defaultValues = {
    name: "N/A",
    checkType: "N/A",
    status: "N/A",
    statusMessage: "N/A",
    duration: "N/A"
  }

  return Object.assign(defaultValues, data)
}

module.exports = {
  formatLogz
}
