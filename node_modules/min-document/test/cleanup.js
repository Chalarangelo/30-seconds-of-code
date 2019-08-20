module.exports = Cleanup

function Cleanup (document) {

    return cleanup

    function cleanup () {
        var childNodes = document.body.childNodes
        for (var i = 0; i < childNodes.length; i++) {
            document.body.removeChild(childNodes[i])
        }
    }
}
