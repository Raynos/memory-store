var test = require("testling")
    , createStore = require("..").createStore

test("can store values in the store", function (t) {
    var value = {}
        , store = createStore()

    store.set("key", value, function (err) {
        isNull(t, err)

        store.get("key", function (err, result) {
            isNull(t, err)
            t.equal(value, result, "result is incorrect")

            t.end()
        })
    })
})

test("returns null for non-existant values", function (t) {
    var store = createStore()

    store.get("key", function (err, result) {
        isNull(t, err)
        t.equal(null, result, "result is not null")

        t.end()
    })
})

test("returns null after value is deleted", function (t) {
    var store = createStore()
        , value = {}

    store.set("key", value, function (err) {
        isNull(t, err)

        store.delete("key", function (err) {
            isNull(t, err)

            store.get("key", function (err, result) {
                isNull(t, err)
                t.equal(null, result, "result is not null")

                t.end()
            })
        })
    })
})

function isNull(t, value) {
    t.equal(null, value, "err is not null")
}