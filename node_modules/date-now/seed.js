var now = require("./index")

module.exports = seeded

/* Returns a Date.now() like function that's in sync with
    the seed value
*/
function seeded(seed) {
    var current = now()

    return time

    function time() {
        return seed + (now() - current)
    }
}
