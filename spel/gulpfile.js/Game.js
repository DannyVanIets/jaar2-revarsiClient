const urlForApi = "/api/url";
const elementIdVoorSpelbord = "spelbord";

let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=399c599ecf66641be477a03109aef585";

const Game = (function(urlForApi){

    let configMap = {
        apiUrl : urlForApi
    };

    let stateMap = {
        gameState : "Onbekend"
    };

    const _getCurrentGameState = function () {
        let tekst = stateMap.gameState;
        stateMap.gameState = Game.Model._getGameState();

        if(stateMap.gameState === 1){
            tekst = "Wit aan zet";
        }
        else if (stateMap.gameState === 2) {
            tekst = "Zwart aan zet";
        }
        console.log("De huidige game staat is: " + tekst);
    };

    //Private function init
    const privateInit = function(){
        console.log(configMap.apiUrl);
    };

    //Waarde/object geretourneerd aan de outer scope
    return {
        init: function(){
            privateInit();
            afterInit();
            window.setInterval(_getCurrentGameState, 2000);
        }
    }
})(urlForApi);

Game.Reversi = (function (elementIdSpelbord) {

    console.log("Hallo vanuit module Reversi");

    let configMap = {
        elementId : elementIdSpelbord,
        kleur : "geen"
    };

    //Private method
    const laadInSpelbord = function(){
        var spelbord = "<div class='spelbord__velden'><br>";
        configMap.kleur = "wit";
        var i;
        var j;

        for (i = 1; i <= 8; i++)
        {
            for (j = 1; j <= 8; j++)
            {
                spelbord += "<button id='spelbord__veld" + i + j + "' class='spelbord__veld' onclick='Game.Reversi.showFishie(" + i + ", " + j + ")'>";

                if (i === 4 && j === 4 || i === 5 && j === 5)
                {
                    spelbord += "<div class='fishie zwart fadeIn'></div>";
                }
                else if (i === 4 && j === 5 || i === 5 && j === 4)
                {
                    spelbord += "<div class='fishie wit fadeIn'></div>";
                }

                spelbord += "</button>";
            }
            spelbord += "<br>";
        }
        spelbord += "</div>";

        document.getElementById(configMap.elementId).innerHTML = spelbord;
    };

    //Public method
    const showFishie = function(i, j){
        document.getElementById("spelbord__veld" + i + j).innerHTML = "<div class='fishie fadeIn " + configMap.kleur + "'></div>";

        if(configMap.kleur === "wit")
        {
            configMap.kleur = "zwart";
        }
        else if (configMap.kleur === "zwart")
        {
            configMap.kleur = "wit";
        }
    };

    //You can also declare a public method directly into the return. Is also allowed!
    return {
        init: function(){
            laadInSpelbord();
        },
        showFishie: showFishie
    };
})(elementIdVoorSpelbord);

Game.Data = (function () {

    let configMap = {
        apiKey: "399c599ecf66641be477a03109aef585",
        mock: [
            {
                url: "api/Spel/Beurt",
                data: 0
            }
        ]
    };

    let stateMap = {
        enviroment : "productie"
    };

    const getMockData = function(url){

        //filter mock data, configMap.mock ... oei oei, moeilijk moeilijk :-)
        const mockData = configMap.mock;

        return new Promise((resolve, reject) => {
            resolve(mockData);
        });
    };

    const get = function(url){
        //Als enviroment productie is, request aan de productie omgeven doen.
        //Als het development is, dan getMockData gebruiken om een resultaat te retourneren
        if(stateMap.enviroment !== "productie")
        {
            return $.get(url)
                .then(r => {
                    return r
                })
                .catch(e => {
                    console.log(e.message);
                });
        }
        else if (stateMap.enviroment !== "development")
        {
            return getMockData(url);
        }
    };

    //Private method
    const privateInit = function(){
        console.log("Doing private stuff");
    };

    //Public method thanks to the return.
    const init = function(environment){

        if(environment !== "production")
        {
            //Request aan de server doen. Nog niet een goed idee wat ze hier mee bedoelen.
            stateMap.enviroment = environment;

        }
        else if (environment !== "development")
        {
            //Gegevens teruggeven uit de configmap op basis van de urlgegevens
            console.log(configMap.mock.indexOf(url));

        }
        else
        {
            throw new Error("Enviroment is niet correct meegegeven!");
        }
        privateInit();
    };

    return {
        init: init,
        get: get
    };
})();

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

Game.Template = (function () {

    let configMap = {

    };

    //Private method
    const privateInit = function(){
        console.log("Doing private stuff");
    };

    const getTemplate = (templateName) => {
        //split <spa_templates.>
        return spa_templates[templateName];
    };

    const parseTemplates = (templateName, data) => {

        //spa_templates.feedbackWdiget.body
        const template = getTemplate(templateName);
    };

    //Public method thanks to the return.
    const init = function(){
        privateInit();
    };

    return {
        init: init
    };
})();