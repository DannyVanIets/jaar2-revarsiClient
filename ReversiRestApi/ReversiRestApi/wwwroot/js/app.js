"use strict";var urlForApi="/api/url",weatherUrl="http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=399c599ecf66641be477a03109aef585",Game=function(e){var t={apiUrl:e},n={gameState:"Onbekend"},r=function(){var e=n.gameState;n.gameState=Game.Model._getGameState(),1===n.gameState?e="Wit aan zet":2===n.gameState&&(e="Zwart aan zet"),console.log("De huidige game staat is: "+e)},o=function(){console.log(t.apiUrl)};return{init:function(){o(),afterInit(),window.setInterval(r,2e3)}}}(urlForApi);Game.Stats=function(){console.log("Hallo vanuit Game.Stats!");var e={chartData:{type:"bar",data:{labels:["Speler1","Speler2","Speler3","Speler4","Speler5","Speler6"],datasets:[{label:"Aantal gewonnen games",data:[12,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}}},t={enviroment:"development"},n=function(t){var n=e.mock;return new Promise(function(e,t){e(n)})},r=function(){if("productie"!==t.enviroment);else if("development"!==t.enviroment)return n()};return{init:function(n){if("production"!==n)t.enviroment=n;else{if("development"===n)throw new Error("Enviroment is niet correct meegegeven!");var r=document.getElementById("myChart").getContext("2d");new Chart(r,e.chartData)}},updateChart:r}}(),Game.Data=function(){var e={apiKey:"399c599ecf66641be477a03109aef585",mock:[{url:"api/Spel/Beurt",data:0}]},t={enviroment:"productie"},n=function(t){var n=e.mock;return new Promise(function(e,t){e(n)})},r=function(e){return"productie"!==t.enviroment?$.get(e).then(function(e){return e}).catch(function(e){console.log(e.message)}):"development"!==t.enviroment?n(e):void 0},o=function(){console.log("Doing private stuff")};return{init:function(n){if("production"!==n)t.enviroment=n;else{if("development"===n)throw new Error("Enviroment is niet correct meegegeven!");console.log(e.mock.indexOf(url))}o()},get:r}}(),Game.Model=function(){var e=function(){Game.Data.get(weatherUrl).then(function(e){return console.log(e)})},t=function(){var e=1;if(0!==e&&1!==e&&2!==e)throw new Error("Dit is niet een juiste beurt!");return e},n=function(){console.log("Doing private stuff")};return{init:function(){n()},getWeather:e,_getGameState:t}}();var elementIdVoorSpelbord="spelbord";Game.Reversi=function(e){console.log("Hallo vanuit module Reversi");var t={elementId:e,kleur:"geen"},n=function(){var e="<div class='spelbord__velden'><br>";t.kleur="wit";var n,r;for(n=1;n<=8;n++){for(r=1;r<=8;r++)e+="<button id='spelbord__veld"+n+r+"' class='spelbord__veld' onclick='Game.Reversi.showFishie("+n+", "+r+")'>",4===n&&4===r||5===n&&5===r?e+="<div class='fishie zwart fadeIn'></div>":(4===n&&5===r||5===n&&4===r)&&(e+="<div class='fishie wit fadeIn'></div>"),e+="</button>";e+="<br>"}e+="</div>",document.getElementById(t.elementId).innerHTML=e},r=function(e,n){document.getElementById("spelbord__veld"+e+n).innerHTML="<div class='fishie fadeIn "+t.kleur+"'></div>","wit"===t.kleur?t.kleur="zwart":"zwart"===t.kleur&&(t.kleur="wit")};return{init:function(){n()},showFishie:r}}(elementIdVoorSpelbord);