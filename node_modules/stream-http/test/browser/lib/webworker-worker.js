var Buffer = require('buffer').Buffer

var http = require('../../..')

module.exports = function (self) {
	self.addEventListener('message', function (ev) {
		var url = ev.data
		http.get(url, function (res) {
			var buffers = []

			res.on('end', function () {
				self.postMessage(Buffer.concat(buffers).buffer)
			})

			res.on('data', function (data) {
				buffers.push(data)
			})
		})
	})
}