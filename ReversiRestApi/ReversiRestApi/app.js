"use strict";

var urlForApi = "/api/url";
var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=399c599ecf66641be477a03109aef585";

var Game = function (urlForApi) {
  var configMap = {
    apiUrl: urlForApi
  };
  var stateMap = {
    gameState: "Onbekend"
  };

  var _getCurrentGameState = function _getCurrentGameState() {
    var tekst = stateMap.gameState;
    stateMap.gameState = Game.Model._getGameState();

    if (stateMap.gameState === 1) {
      tekst = "Wit aan zet";
    } else if (stateMap.gameState === 2) {
      tekst = "Zwart aan zet";
    }

    console.log("De huidige game staat is: " + tekst);
  }; //Private function init


  var privateInit = function privateInit() {
    console.log(configMap.apiUrl);
  }; //Waarde/object geretourneerd aan de outer scope


  return {
    init: function init() {
      privateInit();
      afterInit();
      window.setInterval(_getCurrentGameState, 2000);
    }
  };
}(urlForApi);

Game.Data = function () {
  var configMap = {
    apiKey: "399c599ecf66641be477a03109aef585",
    mock: [{
      url: "api/Spel/Beurt",
      data: 0
    }]
  };
  var stateMap = {
    enviroment: "productie"
  };

  var getMockData = function getMockData(url) {
    //filter mock data, configMap.mock ... oei oei, moeilijk moeilijk :-)
    var mockData = configMap.mock;
    return new Promise(function (resolve, reject) {
      resolve(mockData);
    });
  };

  var get = function get(url) {
    //Als enviroment productie is, request aan de productie omgeven doen.
    //Als het development is, dan getMockData gebruiken om een resultaat te retourneren
    if (stateMap.enviroment !== "productie") {
      return $.get(url).then(function (r) {
        return r;
      })["catch"](function (e) {
        console.log(e.message);
      });
    } else if (stateMap.enviroment !== "development") {
      return getMockData(url);
    }
  }; //Private method


  var privateInit = function privateInit() {
    console.log("Doing private stuff");
  }; //Public method thanks to the return.


  var init = function init(environment) {
    if (environment !== "production") {
      //Request aan de server doen. Nog niet een goed idee wat ze hier mee bedoelen.
      stateMap.enviroment = environment;
    } else if (environment !== "development") {
      //Gegevens teruggeven uit de configmap op basis van de urlgegevens
      console.log(configMap.mock.indexOf(url));
    } else {
      throw new Error("Enviroment is niet correct meegegeven!");
    }

    privateInit();
  };

  return {
    init: init,
    get: get
  };
}();

Game.Model = function () {
  var configMap = {};

  var getWeather = function getWeather() {
    //Check if the temperatuur wordt meegegeven, zo niet, throw  dan een error NOG NIET GEDAAN!
    Game.Data.get(weatherUrl).then(function (data) {
      return console.log(data);
    });
  };

  var _getGameState = function _getGameState() {
    //Aanvragen via Game.Data met een token. Wat die token precies is, is nog onduidelijk
    var urlNaarToken = "api/Spel/Beurt/token.txt"; //let currentGameState = Game.Data.get(urlNaarToken);

    var currentGameState = 1; //controle of ontvangen data valide is

    if (currentGameState !== 0 && currentGameState !== 1 && currentGameState !== 2) {
      throw new Error("Dit is niet een juiste beurt!");
    } else {
      return currentGameState;
    }
  }; //Private method


  var privateInit = function privateInit() {
    console.log("Doing private stuff");
  }; //Public method thanks to the return.


  var init = function init() {
    privateInit();
  };

  return {
    init: init,
    getWeather: getWeather,
    _getGameState: _getGameState
  };
}();

Game.Reversi = function () {
  console.log("Hallo vanuit module Reversi");
  var configMap = {}; //Private method

  var privateInit = function privateInit() {
    console.log("Doing private stuff");
  }; //You can also declare a public method directly into the return. Is also allowed!


  return {
    init: function init() {
      privateInit();
    }
  };
}();