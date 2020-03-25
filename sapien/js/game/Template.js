Game.Template = (function () {

    let configMap = {

    };

    //Private method
    const privateInit = function(){
        console.log("Doing private stuff");
    };

    const getTemplate = (templateName) => {
        //split <spa_templates.>
        return spa_templates[templateName];
    };

    const parseTemplates = (templateName, data) => {
        //spa_templates.feedbackWdiget.body
        const template = getTemplate(templateName);
        return template;
    };

    //Public method thanks to the return.
    const init = function(){
        privateInit();
    };

    return {
        parseTemplates: parseTemplates
    };
})();