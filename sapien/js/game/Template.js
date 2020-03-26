Game.Template = (function () {

    let configMap = {

    };

    //Private method
    const privateInit = function(){
        console.log("Doing private stuff");
    };

    const getTemplate = (templateName) => {
        //split <spa_templates.>
        const props = templateName.split(".");
        let template = spa_templates.templates;

        props.forEach(element => {
            template = template[element];
        });

        return template;
    };

    const parseTemplates = (templateName, data) => {
        //spa_templates.feedbackWdiget.body
        const template = getTemplate(templateName);
        return template(data);
    };

    //Public method thanks to the return.
    const init = function(){
        privateInit();
    };

    return {
        parseTemplates: parseTemplates
    };
})();