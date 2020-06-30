const urlForApi = "/api/url";

let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=399c599ecf66641be477a03109aef585";

const Game = (function(urlForApi){

    let configMap = {
        apiUrl : urlForApi,
        id : 0,
        aanDeBeurt : "geen",
        kleur : "wit"
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

    const UpdateGame = function () {
        // Eerst check je of het bord bezig is.
        Game.Data.get(`api/Spel/IsBezig/${configMap.id}`).then(function (status) {
            if(status) {
                Game.Data.get(`api/Spel/Speelbord/${configMap.id}`).then(function (array) {
                    $(".game").html(Game.Template.parseTemplates("speelbord.speelbord", {
                        bord: array
                    }));
                });

                // Zo kan je ook de beurt opvragen.
                Game.Data.get(`api/Spel/AanDeBeurt/${configMap.id}`).then(function (color) {
                    configMap.aanDeBeurt = color;
                    if(color === 1) {
                        configMap.aanDeBeurt = "wit";
                        $(".aanDeBeurt").html("De kleur wit is aan de beurt!");
                    } else if (color === 2) {
                        configMap.aanDeBeurt = "zwart";
                        $(".aanDeBeurt").html("De kleur zwart is aan de beurt!");
                    }
                });
            } else {
                location.reload();
            }
        });
    };

    //Waarde/object geretourneerd aan de outer scope
    return {
        init: function(id, kleur){
            configMap.id = id;
            if(kleur === 1){
                configMap.kleur = "wit";
            } else if (kleur === 2) {
                configMap.kleur = "zwart";
            }
            window.setInterval(UpdateGame, 2000);
        },
        configMap: configMap
    }
})(urlForApi);