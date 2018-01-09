module.exports = () =>
/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
? 'Mobile'
: 'Desktop';