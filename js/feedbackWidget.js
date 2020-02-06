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
    fw.show("test!", "danger");

    fw.history();
});

class FeedbackWidget {

    constructor(elementId) {
        this._elementId = elementId;
        this.i = 0;
    }

    get elementId() { //getter, set keyword voor setter methode
        return this._elementId;
    }

    show(message, type) {
        var x = document.getElementById(this._elementId);

        x.style.display = "block";
        $(x).text(message);
        this.log(message);

        if(type === "success")
        {
            $(x).addClass("alert-success");
        }
        else
        {
            $(x).addClass("alert-danger");
        }
    }

    hide() {
        var x = document.getElementById(this._elementId);
        x.style.display = "none";
    }

    log(message){
        localStorage.setItem("feedback_widget" + this.i, JSON.stringify(message));
        this.i = this.i + 1;
    }

    removeLog(key){
        localStorage.removeItem(key);
    }

    removeAllLogs(){
        localStorage.clear();
    }

    history(){
        this.historyMessages = [];

        for(let j = 0, len = localStorage.length; j < len; j++){
            if(j != len){
                this.historyMessages.push(JSON.parse(localStorage.getItem("feedback_widget" + j)) + "\n");
            } else {
                this.historyMessages.push(JSON.parse(localStorage.getItem("feedback_widget" + j)));
            }
        }

        this.historyMessageWithoutKommas = this.historyMessages.toString().replace(/,/g, "");
        this.show(this.historyMessageWithoutKommas, "onbekend");
    }
}