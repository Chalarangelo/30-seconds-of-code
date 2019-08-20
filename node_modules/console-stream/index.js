var Stream = require("stream")
var console = require("console")

var NEW_LINE = "\n"

module.exports = ConsoleStream

function ConsoleStream() {
    var stream = new Stream()
    stream.writable = true
    var buffered = ""

    stream.write = write
    stream.destroy = destroy
    stream.end = end

    return stream

    function write(buffer) {
        var s = buffered + String(buffer)
        var lines = s.split(NEW_LINE)
        for (var i = 0; i < lines.length - 1; i++) {
            console.log(lines[i])
        }

        buffered = lines[i]
    }

    function destroy() {
        stream.writable = false
        stream.emit("close")
    }

    function end(buffer) {
        if (arguments.length === 1) {
            stream.write(buffer)
        }

        if (buffered) {
            console.log(buffered)
        }

        stream.destroy()
    }
}
