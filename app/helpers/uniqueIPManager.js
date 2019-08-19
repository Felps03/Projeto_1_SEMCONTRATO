const flat = require('../utils/flat');

class UniqueIPManager {
    // default to 5min pops with 1000 maximum ips
    constructor({ popInterval = 1000 * 60, nbatches = 5 }) {
        this.batches = [];
        this.looper = null;
        this.activeBatch = 0;

        this.popIntervalVal = popInterval;
        this.nbatches = nbatches;

        for (let i = 0; i < this.nbatches; i++) {
            this.batches[i] = [];
        }
    }

    // init looper popping one element from time to time
    init() {
        this.looper = setInterval(() => {
            this.pop();
        }, this.popIntervalVal);
    }

    // reset the looper (useful if the interval changes at some point)
    resetLooper() {
        clearInterval(this.looper);
        this.init();
    }

    // setter to reset the counter when the interval changes
    set popInterval(val) {
        this.popIntervalVal = val;
        this.resetLooper();
    }

    // remove the last ips (actually it inst a pop but looks like it)
    pop() {
        this.activeBatch = (this.activeBatch + 1) % this.nbatches;
        const popped = this.batches[this.activeBatch];
        this.batches[this.activeBatch] = [];
        console.log(`Popping elements ${JSON.stringify(popped)} (new index ${this.activeBatch})`);
        return popped;
    }

    // add the ip to the array
    push(val) {
        this.batches[this.activeBatch].push(val);
    }

    // returns whether the ip already exists in the array and catalogs it if not
    verify(ip) {
        if (flat(this.batches).includes(ip)) {
            return true;
        } else {
            this.push(ip);
            return false;
        }
    }
}

module.exports = UniqueIPManager;