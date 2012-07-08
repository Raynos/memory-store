# memory-store [![build status][1]][2]

Session store in memory

## Example

    var store = require("memory-store")
        , assert = require("assert")

    store.set("foo", "bar")
    assert.equal(store.get("foo"), "bar")
    store.delete("foo")
    assert.equal(store.get("foo"), null)

    var otherStore = store.createStore()

## Installation

`npm install memory-store`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/memory-store.png
  [2]: http://travis-ci.org/Raynos/memory-store