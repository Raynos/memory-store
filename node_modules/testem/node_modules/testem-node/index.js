var io = require("socket.io-client")
    , tap = require("tap")
    , extend = require("xtend")
    , Consumer = tap.Consumer
    , spawn = require("child_process").spawn
    , consumer
    , first = false
    , results = {
        failed: 0
        , passed: 0
        , total: 0
        , tests: []
    }
    , defaultTestemOptions = {
        port: 7357
        , host: "localhost"
        , command: "node"
        , args: []
    }

module.exports = connectToTestem

function connectToTestem(testemOptions) {
    testemOptions = extend({}, defaultTestemOptions, testemOptions || {})

    var socket = io.connect("http://" + testemOptions.host + ":" +
        testemOptions.port)

    emit("browser-login", "Node")
    socket.on("connect", startTests)
    socket.on("reconnect", startTests)
    socket.on("start-tests", startTests)

    function startTests() {
        emit("browser-login", "Node")
        if (consumer) {
            consumer.removeListener("data", onData)
            consumer.removeListener("end", onEnd)
        }

        consumer = new Consumer()

        consumer.on("data", onData)

        consumer.on("end", onEnd)

        var child = spawn(testemOptions.command, testemOptions.args)
        child.stdout.pipe(consumer)
        child.stderr.pipe(process.stderr)
    }

    function emit() {
        socket.emit.apply(socket, arguments)
    }

    function onData(data) {
        if (first === false) {
            first = true
            emit("tests-start")
        }

        if (data.id === undefined) {
            return
        }

        var tst = {
            passed: 0
            , failed: 0
            , total: 1
            , id: data.id
            , name: data.name
            , items: []
        }

        if (!data.ok) {
            tst.items.push({
                passed: false
                , message: data.name
                , stacktrace: data.stack && data.stack.join("\n")
            })
            results.failed++
            tst.failed++
        } else {
            results.passed++
            tst.passed++
        }

        results.total++
        results.tests.push(tst)

        emit("test-result", tst)
    }

    function onEnd(err, count, passed) {
        emit("all-test-results", results)
    }
}