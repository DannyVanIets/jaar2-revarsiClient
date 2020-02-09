const url = "/api/url";

const Game = (function(url){

    let configMap = {
        apiUrl : url
    };

    //Private function init
    const privateInit = function(){
        console.log(configMap.apiUrl);
    };

    //Waarde/object geretourneerd aan de outer scope
    return {
        init: privateInit
    }
})(url);

Game.init();

Game.Reversi = (function () {
    console.log("Hallo vanuit module Reversi");

    let configMap = {

    };

    const privateInit = function(){
        console.log("Doing private stuff");
    };

    return {
        init: function(){
            privateInit();
        }
    };
})();