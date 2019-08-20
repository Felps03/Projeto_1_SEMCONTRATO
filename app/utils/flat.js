module.exports = function (arr) {
    return arr.reduce((acc, val) => acc.concat(val), []);
}