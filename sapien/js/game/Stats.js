Game.Stats = (function () {
    const updateGraph = function() {
        let aantalFishies = Game.Data.aantalFishies();
        let beurtenLijst = Game.Data.getAantalBeurten();
        $('.grafiek').html(Game.Template.parseTemplates("chart.chart", {zwart: aantalFishies.zwart, wit: aantalFishies.wit, beurten: beurtenLijst}));
    };

    const init = function(){
        setTimeout(function(){updateGraph()}, 2000);
    };

    return {
        init: init,
        updateGraph: updateGraph
    }
})();