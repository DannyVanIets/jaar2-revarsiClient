Game.API = (function () {

    //Public method thanks to the return.
    const getRandomFact = function(){
        return Game.Data.get(`https://uselessfacts.jsph.pl/random.json`);
    };

    return {
        getRandomFact: getRandomFact
    };
})();
