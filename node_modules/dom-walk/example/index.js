var walk = require("../index")

walk(document.body.childNodes, function (node) {
    console.log("node", node)
})