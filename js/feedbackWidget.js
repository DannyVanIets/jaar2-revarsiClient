$(function () {
    console.log("Ready!");
    let fw = new FeedbackWidget("feedback-danger");
    fw.show();
});

class FeedbackWidget {
    constructor(elementId) {
        this._elementId = elementId;
    }

    get elementId() { //getter, set keyword voor setter methode
        return this._elementId();
    }

    show() {
        var x = document.getElementById(this._elementId);
        x.style.display = "block";
    }

    hide() {
        var x = document.getElementById(this._elementId);
        x.style.display = "none";
    }
}