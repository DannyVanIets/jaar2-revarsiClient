const elementIdVoorSpelbord = "spelbord";

Game.Reversi = (function (elementIdSpelbord) {

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
        configMap.kleur === "wit";
        document.getElementById("spelbord__veld" + i + j).innerHTML = "<div class='fishie fadeIn " + configMap.kleur + "'></div>";

        if(configMap.kleur === "wit")
        {
            Game.Stats.configMap.chartData.data.datasets[0]["data"][0] = Game.Stats.configMap.chartData.data.datasets[0]["data"][0] + 1;
            Game.Stats.init("production");
            configMap.kleur = "zwart";
        }
        else if (configMap.kleur === "zwart")
        {
            Game.Stats.configMap.chartData.data.datasets[0]["data"][1] = Game.Stats.configMap.chartData.data.datasets[0]["data"][1] + 1;
            Game.Stats.init("production");
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