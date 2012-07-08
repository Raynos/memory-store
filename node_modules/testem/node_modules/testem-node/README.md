# Testem node

Connect to a testem server and run the unit tests in node.js

## Example

    var testemNode = require("testem-node")

    testemNode(
        port: 7357
        , host: "localhost"
        , command: "tap"
        , args: ["--tap", "test"]
    })