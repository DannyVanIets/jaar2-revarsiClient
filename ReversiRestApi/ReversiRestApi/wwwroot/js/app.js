"use strict";var urlForApi="/api/url",weatherUrl="http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=399c599ecf66641be477a03109aef585",Game=function(e){var t={apiUrl:e},a={gameState:"Onbekend"},n=function(){var e=a.gameState;a.gameState=Game.Model._getGameState(),1===a.gameState?e="Wit aan zet":2===a.gameState&&(e="Zwart aan zet"),console.log("De huidige game staat is: "+e)},r=function(){console.log(t.apiUrl)};return{init:function(){r(),afterInit(),window.setInterval(n,2e3)}}}(urlForApi);Game.Stats=function(){console.log("Hallo vanuit Game.Stats!");var e={chartData:{type:"bar",data:{labels:["Speler1","Speler2","Speler3","Speler4","Speler5","Speler6"],datasets:[{label:"Aantal gewonnen games",data:[12,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}}},t={enviroment:"productie"},a=function(t){var a=e.mock;return new Promise(function(e,t){e(a)})},n=function(){if("productie"!==t.enviroment);else if("development"!==t.enviroment)return a()};return{init:function(a){if("production"!==a)t.enviroment=a;else{if("development"===a)throw new Error("Enviroment is niet correct meegegeven!");var n=document.getElementById("myChart").getContext("2d");new Chart(n,e.chartData)}},updateChart:n}}(),Game.Data=function(){var e={apiKey:"399c599ecf66641be477a03109aef585",mock:[{url:"api/Spel/Beurt",data:0}]},t={enviroment:"productie"},a=function(t){var a=e.mock;return new Promise(function(e,t){e(a)})},n=function(e){return"productie"!==t.enviroment?$.get(e).then(function(e){return e}).catch(function(e){console.log(e.message)}):"development"!==t.enviroment?a(e):void 0},r=function(){console.log("Doing private stuff")};return{init:function(a){if("production"!==a)t.enviroment=a;else{if("development"===a)throw new Error("Enviroment is niet correct meegegeven!");console.log(e.mock.indexOf(url))}r()},get:n}}(),Game.Model=function(){var e=function(){Game.Data.get(weatherUrl).then(function(e){return console.log(e)})},t=function(){var e=1;if(0!==e&&1!==e&&2!==e)throw new Error("Dit is niet een juiste beurt!");return e},a=function(){console.log("Doing private stuff")};return{init:function(){a()},getWeather:e,_getGameState:t}}();var elementIdVoorSpelbord="spelbord";Game.Reversi=function(e){var t={elementId:e,kleur:"geen"},a=function(){var e="<div class='spelbord__velden'><br>";t.kleur="wit";var a,n;for(a=1;a<=8;a++){for(n=1;n<=8;n++)e+="<button id='spelbord__veld"+a+n+"' class='spelbord__veld' onclick='Game.Reversi.showFishie("+a+", "+n+")'>",4===a&&4===n||5===a&&5===n?e+="<div class='fishie zwart fadeIn'></div>":(4===a&&5===n||5===a&&4===n)&&(e+="<div class='fishie wit fadeIn'></div>"),e+="</button>";e+="<br>"}e+="</div>",document.getElementById(t.elementId).innerHTML=e},n=function(e,a){t.kleur,document.getElementById("spelbord__veld"+e+a).innerHTML="<div class='fishie fadeIn "+t.kleur+"'></div>","wit"===t.kleur?(Game.Stats.configMap.chartData.data.datasets[0].data[0]=Game.Stats.configMap.chartData.data.datasets[0].data[0]+1,Game.Stats.init("production"),t.kleur="zwart"):"zwart"===t.kleur&&(Game.Stats.configMap.chartData.data.datasets[0].data[1]=Game.Stats.configMap.chartData.data.datasets[0].data[1]+1,Game.Stats.init("production"),t.kleur="wit")};return{init:function(){a()},showFishie:n}}(elementIdVoorSpelbord),Game.Template=function(){var e=function(e){return spa_templates[e]},t=function(t,a){return e(t)};return{parseTemplates:t}}();