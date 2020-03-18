const urlForApi = "/api/url";

let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=399c599ecf66641be477a03109aef585";

const Game = (function(urlForApi){

    let configMap = {
        apiUrl : urlForApi
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

    //Private function init
    const privateInit = function(){
        console.log(configMap.apiUrl);
    };

    //Waarde/object geretourneerd aan de outer scope
    return {
        init: function(){
            privateInit();
            afterInit();
            window.setInterval(_getCurrentGameState, 2000);
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
                    labels: ['Speler1', 'Speler2', 'Speler3', 'Speler4', 'Speler5', 'Speler6'],
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
        enviroment : "productie"
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
        if(stateMap.enviroment !== "productie")
        {
            /*return $.get()
                .then(r => {
                    return r
                })
                .catch(e => {
                    console.log(e.message);
                });*/
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