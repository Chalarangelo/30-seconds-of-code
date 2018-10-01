function getCookie(name) {
  const parts = ('; ' + document.cookie).split('; ' + name + '=')
  if (parts.length === 2) return parts.pop().split(';').shift()
}
module.exports = getCookie;
