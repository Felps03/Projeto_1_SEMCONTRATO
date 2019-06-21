function generateString() {
    const randomString = Math.round(Math.random() * 10000000000).toString(16).substring(1);
    // console.log(randomString);
    return randomString;
}

module.exports = generateString;