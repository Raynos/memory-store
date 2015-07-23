function MemoryStore() {
    this.data = [];
};

MemoryStore.prototype.get = function(property) {
    for(key in this.data) {
        if(property == key) {
            return this.data[key];
        }
    }

    return null;
};

MemoryStore.prototype.set = function(property, value) {
    this.data[property] = value;
    return this;
};

MemoryStore.prototype.getAll = function() {
    return this.data;
}

MemoryStore.prototype.delete = function(property) {
    if(this.data[property] != undefined) {
        delete this.data[property];
    }

    return this;
};

MemoryStore.prototype.clear = function() {
    this.data = {};
}

MemoryStore.prototype.createStore = function() {
    return new MemoryStore();
}

module.exports = new MemoryStore();