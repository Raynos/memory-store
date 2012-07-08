module.exports = createStore()

function createStore() {
    return {
        set: storeSet
        , get: storeGet
        , delete: storeDelete
        , createStore: createStore
        , _store: {}
    }
}

function storeSet(key, value, cb) {
    this._store[key] = value
    cb(null)
}

function storeGet(key, cb) {
    if (key in this._store) {
        return cb(null, this._store[key])
    }
    cb(null, null)
}

function storeDelete(key, cb) {
    delete this._store[key]
    cb(null, true)
}