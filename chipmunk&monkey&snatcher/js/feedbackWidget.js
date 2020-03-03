$(function () {
    console.log("Ready!");
    let fw = new FeedbackWidget("feedback-success");
    fw.show("Veel success ermee!", "success");

    let logShow = {
        message: "Bijna klaar, tijd voor koffie",
        type: "success"
    };

    fw.show(logShow.message, logShow.type);
    fw.show("Niet in slaap vallen!", "danger");
    fw.show("Pas op!", "danger");

    fw.history();

    $(".showButton").on("click", function() {
        $(".invitation").attr("style", "display: flex");
    });

    $(".closeButton").on("click", function() {
        $(".invitation").attr("style", "display: none");
    });
});

class FeedbackWidget {

    constructor(elementId) {
        this._elementId = elementId;
    }

    get elementId() { //getter, set keyword voor setter methode
        return this._elementId;
    }

    show(message, type) {
        var x = document.getElementById(this._elementId);
        //x.style.display = "block";
        $(x).text(message);

        let logObject = {
            message: message,
            type: type
        };

        this.log(logObject);

        if(type === "success")
        {
            $(x).removeClass("alert-danger");
            $(x).addClass("alert-success");
        }
        else
        {
            $(x).removeClass("alert-success");
            $(x).addClass("alert-danger");
        }
    }

    hide() {
        var x = document.getElementById(this._elementId);
        x.style.display = "none";
    }

    log(message){
        let logMessages = [];

        if(localStorage.length !== 0){
            logMessages = JSON.parse(localStorage.getItem("feedback_widget"));
        }

        if(logMessages.length >= 10){
            logMessages.pop();
        }

        logMessages.unshift(message);
        localStorage.setItem("feedback_widget", JSON.stringify(logMessages));
    }

    removeLog(key){
        localStorage.removeItem(key);
    }

    removeAllLogs(){
        localStorage.clear();
    }

    history(){
        let arrayLogs = [];
        let logString = "";

        arrayLogs = JSON.parse(localStorage.getItem("feedback_widget"));

        arrayLogs.forEach(x => logString += `type: ${x.type}    -   ${x.message} \n`);

        console.log(logString);
    }
}

$.get(weatherUrl, function( data ) {
    $( ".result" ).html( data );
    alert( "Load was performed." );
});

function afterInit(){
    console.log("Game init voltooid");
}

Game.init(afterInit);

//Resolve meegeven as callback in de constructor.
//De promise klasse roept de callback aan met twee
//Methodes van de klasse zelf: resolve en reject.
//Deze zijn dus beschikbaar in de callback.
const resolver = function (resolve, reject) {
    setTimeout(function () {
        //reject("Woops, niet goed!");
        resolve("Supercalifragilicious");
    }, 4000);
};

const p1 = new Promise(resolver);

//Resolved waarde opvangen en errors opvangen
p1.then(function (result) {
    console.log(result);
    console.log("b");

    //Je mag zowel een waarde als een Promise returnen!
    return "a en b";
}).then(result => {
    console.log(result);
    throw new Error("Nee zeg, wat een ramp, het gaat fout!");
}).catch(err => { //errors worden opgavengen in een catch, ook van een eerdere .then's
    console.log(`Fout: ${err.message}`);
});