Game.Data = (function () {

    let configMap = {
        mock: [
                {
                    url: 'api/Spel/Speelbord/0',
                    data: [
                        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 1, 2, 0, 0, 0 ],
                        [ 0, 0, 0, 2, 1, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                    ]
                },
                {
                    url: 'api/Spel/IsBezig/0',
                    data: true
                },
                {
                    url: 'api/Spel/AanDeBeurt/0',
                    data: 1
                }
            ]
    };

    let stateMap = {
        environment : "production"
    };

    const getMockData = function(url){
        const mockData = configMap.mock.find(m => m.url === url);
        return new Promise((resolve, reject) => {
            resolve(mockData.data);
        });

    };

    const get = function(url){
        //Als enviroment productie is, request aan de productie omgeven doen.
        //Als het development is, dan getMockData gebruiken om een resultaat te retourneren

        //Zorg ervoor dat je hier checkt of er een API wordt aangeroepen.
        if(stateMap.environment !== "development")
        {
            if(url.startsWith("api")) {
                url = 'https://' + window.location.href.split("/")[2] + '/' + url;
            }
            return $.get(url)
                .then(r => {
                    return r
                })
                .catch(e => {
                    console.log(e.message);
                });
        }
        else
        {
            return getMockData(url);
        }
    };

    const _put = function(url, data) {
        if (stateMap.environment !== 'development') {
            url = 'https://' + window.location.href.split("/")[2] + '/' + url;
            return $.ajax({
                url: url,
                method: 'PUT',
                contentType: "application/json",
                dataType: 'text',
                data: JSON.stringify(data)
            })
        }
    };

    const _getStoneCount = function() {
        if (localStorage.getItem("stone_count") == null) {
            let countObj = { black: [], white: [] };
            localStorage.setItem("stone_count", JSON.stringify(countObj));
            return countObj;
        }
        else {
            return JSON.parse(localStorage.getItem("stone_count"));
        }
    };

    const _setStoneCount = function(color, count) {
        let countObj = _getStoneCount();

        if (color === 2) {
            countObj.black.push(count);
        } else if (color === 1) {
            countObj.white.push(count);
        } else {
            throw new Error("Invalid color!");
        }

        localStorage.setItem("stone_count", JSON.stringify(countObj));
    };

    const _getTurns = function() {
        if (localStorage.getItem("turns") == null) {
            let turns = [0];
            localStorage.setItem("turns", JSON.stringify(turns));
            return turns;
        }
        else {
            return JSON.parse(localStorage.getItem("turns"));
        }
    };

    const _setTurn = function(turn) {
        let turnsArray = _getTurns();
        turnsArray.push(turn);
        localStorage.setItem("turns", JSON.stringify(turnsArray));
    };

    const _countStones = function(board) {
        let white = 0;
        let black = 0;

        for (let row of board) {
            for (let column of row) {
                if (column === 1)
                    white++;
                else if (column === 2)
                    black++;
            }
        }

        let currentCount = _getStoneCount();
        let currentWhite = currentCount.white[currentCount.white.length - 1];
        let currentBlack = currentCount.black[currentCount.black.length - 1];

        // Don't update the count in the local storage if it is the same as the last count (page is refreshed for instance)
        if (white !== currentWhite || black !== currentBlack) {
            _setStoneCount(2, black);
            _setStoneCount(1, white);

            let turnArray = _getTurns();
            // Update turn counter if needed
            if (currentCount.white.length === turnArray.length) {
                let currentTurn = turnArray[turnArray.length - 1];
                Game.Data.setTurn(currentTurn + 1);
            }
        }
    };

    //Public method thanks to the return.
    const init = function(environment){

        if(environment !== "production")
        {
            //Request aan de server doen. Nog niet een goed idee wat ze hier mee bedoelen.
            stateMap.environment = environment;

        }
        else if (environment !== "development")
        {
            //Gegevens teruggeven uit de configmap op basis van de urlgegevens
            console.log(configMap.mock.indexOf(url));
        }
        else
        {
            throw new Error("environment is niet correct meegegeven!");
        }
    };

    return {
        init: init,
        get: get,
        put: _put,
        stateMap: stateMap
    };
})();