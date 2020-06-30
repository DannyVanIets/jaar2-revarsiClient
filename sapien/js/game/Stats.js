Game.Stats = (function () {
    const _updateChart = function() {
        let stoneCount = Game.Data.getStoneCount();
        let turnArray = Game.Data.getTurns();
        $('.grafiek').html(Game.Templates.parseTemplate("game.stats", {black: stoneCount.black, white: stoneCount.white, turns: turnArray}));
    };

    const init = function(){
        setTimeout(function(){_updateChart}, 2000);
    };

    return {
        init: init,
        updateChart: _updateChart
    }
})();