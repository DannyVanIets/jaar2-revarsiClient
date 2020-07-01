const elementIdVoorSpelbord = "spelbord";

Game.Reversi = (function (elementIdSpelbord) {

    let configMap = {
        elementId : elementIdSpelbord
    };

    //Public method
    const showFishie = function(i, j){

        if(Game.configMap.aanDeBeurt === Game.configMap.kleur) {
            if (Game.Data.stateMap.environment !== 'development') {
                let response = Game.Data.put(`api/Spel/ZetMogelijk/`,
                    {
                        id: Game.configMap.id,
                        rij: j,
                        kolom: i,
                    }).always(function () {
                    if (response.status === 204) {
                        laadRandomFact();
                        document.getElementById("spelbord__veld" + i + j).innerHTML = "<div class='fishie fadeIn " + configMap.kleur + "'></div>";

                        Game.Data.get(`api/Spel/Speelbord/${Game.configMap.id}`).then(function (array) {
                            $(".game").html(spa_templates.templates.speelbord.speelbord({
                                bord: array
                            }));
                            Game.Data.telFishies(array);
                        });

                        Game.Data.get(`api/Spel/AanDeBeurt/${Game.configMap.id}`).then(function (color) {
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

                        if (configMap.kleur === "wit") {
                            configMap.kleur = "zwart";
                        } else if (configMap.kleur === "zwart") {
                            configMap.kleur = "wit";
                        }
                    } else {
                        alert("Het is niet mogelijk om op rij " + j + " en kolom " + i + " neer te zetten!");
                    }
                });
            } else {
                document.getElementById("spelbord__veld" + i + j).innerHTML = "<div class='fishie fadeIn " + configMap.kleur + "'></div>";

                if (configMap.kleur === "wit") {
                    Game.Stats.init();
                    configMap.kleur = "zwart";
                } else if (configMap.kleur === "zwart") {
                    Game.Stats.init();
                    configMap.kleur = "wit";
                }
            }
        } else {
            alert("U bent momenteel niet aan de beurt!");
        }
    };

    const laadRandomFact = function(){
        Game.API.getRandomFact().then(function (randomFact) {
            $(".randomFact").html(Game.Template.parseTemplates("randomFacts.randomFacts", {
                language: randomFact.language,
                fact: randomFact.text
            }));
        });
    };

    //You can also declare a public method directly into the return. Is also allowed!
    return {
        showFishie: showFishie,
        configMap: configMap,
        laadRandomFact: laadRandomFact
    };
})(elementIdVoorSpelbord);