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