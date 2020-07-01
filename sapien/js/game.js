const urlForApi = "/api/url";

const Game = (function(urlForApi){

    let configMap = {
        apiUrl : urlForApi,
        id : 0,
        aanDeBeurt : "geen",
        kleur : "wit"
    };

    const UpdateGame = function () {
        // Eerst check je of het bord bezig is.
        Game.Data.get(`api/Spel/IsBezig/${configMap.id}`).then(function (status) {
            if(status) {
                Game.Data.get(`api/Spel/Speelbord/${configMap.id}`).then(function (array) {
                    $(".game").html(Game.Template.parseTemplates("speelbord.speelbord", {
                        bord: array
                    }));
                    Game.Data.telFishies(array);
                });

                // Zo kan je ook de beurt opvragen.
                Game.Data.get(`api/Spel/AanDeBeurt/${configMap.id}`).then(function (color) {
                    configMap.aanDeBeurt = color;
                    Game.Stats.init();
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