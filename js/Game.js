const url = "/api/url";

const Game = (function(url){

    console.log(url);

    //Private function init
    const privateInit = function(){
        console.log("Private information!");
    };

    let configMap = {
        api : url
    };

    //Waarde/object geretourneerd aan de outer scope
    return {
        init: privateInit
    }
})(url);

Game.init();