const fn = function(voornaam) {
    return function () {
        console.log("Taak js is uitgevoerd, " + voornaam + "!");
        return Promise.resolve("Klaar");
    }
};

exports.js = fn;