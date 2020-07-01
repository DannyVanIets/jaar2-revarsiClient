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

    const aantalFishies = function() {
        if (localStorage.getItem("aantal_fishies") == null) {
            let countObj = { zwart: [], wit: [] };
            localStorage.setItem("aantal_fishies", JSON.stringify(countObj));
            return countObj;
        }
        else {
            return JSON.parse(localStorage.getItem("aantal_fishies"));
        }
    };

    const setAantalFishies = function(color, count) {
        let countObj = aantalFishies();
        console.log("3");
        if (color === 2) {
            console.log("4");
            countObj.zwart.push(count);
        } else if (color === 1) {
            console.log("5");
            countObj.wit.push(count);
        } else {
            throw new Error("Onjuiste kleur!");
        }
        localStorage.setItem("aantal_fishies", JSON.stringify(countObj));
    };

    const getAantalBeurten = function() {
        if (localStorage.getItem("beurten") == null) {
            let beurten = [0];
            localStorage.setItem("beurten", JSON.stringify(beurten));
            return beurten;
        }
        else {
            return JSON.parse(localStorage.getItem("beurten"));
        }
    };

    const setAantalBeurten = function(turn) {
        let beurtenLijst = getAantalBeurten();
        beurtenLijst.push(turn);
        localStorage.setItem("beurten", JSON.stringify(beurtenLijst));
    };

    const telFishies = function(board) {
        let wit = 0;
        let zwart = 0;

        for (let row of board) {
            for (let column of row) {
                if (column === 1)
                    wit++;
                else if (column === 2)
                    zwart++;
            }
        }

        let currentCount = aantalFishies();
        let aantalWit = currentCount.wit[currentCount.wit.length - 1];
        let aantalZwart = currentCount.zwart[currentCount.zwart.length - 1];
        console.log("2");
        // Don't update the count in the local storage if it is the same as the last count (page is refreshed for instance)
        if (wit !== aantalWit || zwart !== aantalZwart) {
            console.log("1");
            setAantalFishies(2, zwart);
            setAantalFishies(1, wit);

            let beurtenLijst = getAantalBeurten();
            // Update turn counter if needed
            if (currentCount.wit.length === beurtenLijst.length) {
                let huidigeBeurt = beurtenLijst[beurtenLijst.length - 1];
                Game.Data.setAantalBeurten(huidigeBeurt + 1);
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
        stateMap: stateMap,
        aantalFishies: aantalFishies,
        setAantalFishies: setAantalFishies,
        setAantalBeurten: setAantalBeurten,
        getAantalBeurten: getAantalBeurten,
        telFishies: telFishies
    };
})();