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

    //Private method
    const privateInit = function(){
        console.log("Doing private stuff");
    };

    //You can also declare a public method directly into the return. Is also allowed!
    return {
        init: function(){
            privateInit();
        }
    };
})();

Game.Data = (function () {

    let configMap = {

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
        init: init
    };
})();

Game.Model = (function () {

    let configMap = {

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
        init: init
    };
})();