const Game = (function(){
    console.log('hallo, vanuit een module');

    //Private function init
    const privateInit = function(){
        console.log("Private information!");
    }

    //Waarde/object geretourneerd aan de outer scope
    return {
        init: privateInit
    }
})();

Game.init();