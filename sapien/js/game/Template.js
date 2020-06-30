Game.Template = (function () {

    let configMap = {

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
        const template = getTemplate(templateName);
        return template(data);
    };

    return {
        parseTemplates: parseTemplates
    };
})();