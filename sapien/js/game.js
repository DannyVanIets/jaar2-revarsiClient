const urlForApi = "/api/url";

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