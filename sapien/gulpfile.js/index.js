const config = require('./config');

const hello = function (done) {
    console.log(`Groeten van ${config.voornaam}!`);
    done();
};


exports.default = hello;