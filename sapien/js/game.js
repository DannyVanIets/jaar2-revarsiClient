const urlForApi = "/api/url";

let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=399c599ecf66641be477a03109aef585";

const Game = (function(urlForApi){

    let configMap = {
        apiUrl : urlForApi,
        id : 0
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
                    console.log("1");
                    $(".game").html(spa_templates.templates.speelbord.speelbord({
                        //bord: array[0].data
                    }));
                });

                // Zo kan je ook de beurt opvragen.
                Game.Data.get(`api/Spel/AanDeBeurt/${configMap.id}`).then(function (color) {
                    console.log("2");
                    console.log(color);
                    $(".aanDeBeurt").html("De kleur " + color + " is aan de beurt!");
                });
            } else {
                console.log("3");
                location.reload();
            }
        });
    };

    //Waarde/object geretourneerd aan de outer scope
    return {
        init: function(id){
            configMap.id = id;
            window.setInterval(UpdateGame, 2000);
        }
    }
})(urlForApi);

Game.Stats = (function () {

    console.log("Hallo vanuit Game.Stats!");

    const configMap = {
        chartData:
            {
                type: 'bar',
                data: {
                    labels: ['Speler1', 'Speler2'],
                    datasets: [{
                        label: 'Aantal gewonnen games',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            }
    };

    const stateMap = {
        enviroment : "production"
    };

    const getMockData = function(url){
        //filter mock data, configMap.mock ... oei oei, moeilijk moeilijk :-)
        const mockData = configMap.mock;

        return new Promise((resolve, reject) => {
            resolve(mockData);
        });
    };

    const updateChart = function () {
        //Als enviroment productie is, request aan de productie omgeven doen.
        //Als het development is, dan getMockData gebruiken om een resultaat te retourneren
        if(stateMap.enviroment !== "production")
        {
            return $.get()
                .then(r => {
                    return r
                })
                .catch(e => {
                    console.log(e.message);
                });
        }
        else if (stateMap.enviroment !== "development")
        {
            return getMockData();
        }
    };

    const init = function(environment){
        if(environment !== "production")
        {
            //Request aan de server doen. Nog niet een goed idee wat ze hier mee bedoelen.
            stateMap.enviroment = environment;
        }
        else if (environment !== "development")
        {
            //Gegevens teruggeven uit de configmap op basis van de urlgegevens
            //console.log(configMap.mock.indexOf(url));
            //configMap.chartData.data.labels
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, configMap.chartData);
        }
        else
        {
            throw new Error("Enviroment is niet correct meegegeven!");
        }
    };

    return {
        init: init,
        updateChart: updateChart
    }
})();