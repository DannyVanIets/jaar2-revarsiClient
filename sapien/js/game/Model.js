Game.Model = (function () {

    let configMap = {

    };

    let getWeather  = function () {
        //Check if the temperatuur wordt meegegeven, zo niet, throw  dan een error NOG NIET GEDAAN!
        Game.Data.get(weatherUrl).then(data => console.log(data));
    };

    const _getGameState = function () {

        //Aanvragen via Game.Data met een token. Wat die token precies is, is nog onduidelijk
        let urlNaarToken = "api/Spel/Beurt/token.txt";
        //let currentGameState = Game.Data.get(urlNaarToken);
        let currentGameState = 1;

        //controle of ontvangen data valide is
        if(currentGameState !== 0 && currentGameState !== 1 && currentGameState !== 2) {
            throw new Error("Dit is niet een juiste beurt!");
        } else {
            return currentGameState;
        }
    };

    //Private method
    const privateInit = function(){
        console.log("Doing private stuff");
    };

    //Public method thanks to the return.
    const init = function(){
        privateInit();
    };

    return {
        init: init,
        getWeather  : getWeather,
        _getGameState : _getGameState
    };
})();