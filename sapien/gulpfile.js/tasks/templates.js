const {src, dest} = require('gulp');
const handlebars = require('gulp-handlebars');
const concat = require('gulp-concat');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const merge = require('merge-stream');
const path = require('path');

//tip: vergeet niet dat de extensie .hbs is, dus de glob van
//templateFiles kan er zo uitzien: templates/**/*.hbs

const templates = function (templatesFiles, partialFiles, helperFiles, serverProjectPath) {

    const template = src(templatesFiles)
        // Compile each Handlebars template source file to a template function
        .pipe(handlebars())
        // Wrap each template function in a call to Handlebars.template
        .pipe(wrap('Handlebars.template(<%= contents %>)', {}))
        // Declare template functions as properties and sub-properties of MyApp.templates
        .pipe(declare({
            namespace: 'spa_templates',
            noRedeclare: true, // Avoid duplicate declarations
            processName: function(filePath) {
                // Allow nesting based on path using gulp-declare's processNameByPath()
                // You can remove this option completely if you aren't using nested folders
                // Drop the client/templates/ folder from the namespace path by removing it from the filePath
                return declare.processNameByPath(filePath.replace('<parent_map>/templates/', '')); //windows? backslashes: \\
            }
        }));

    const partials = src(partialFiles)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function (fileName) {
                    // Strip the extension and the underscore
                    // Escape the output with JSON.stringify
                    return JSON.stringify(path.basename(fileName, '.js').substr(1));
                }
            }
        }));

    const helpers = src(helperFiles)
        .pipe(handlebars())
        .pipe(order(helperFilesOrder, {base: '.'}))
        .pipe(wrap('Handlebars.registerHelper(<%= processHelperName(file.relative) %>, <%= functionContents(file.path) %>);', {}, {
            imports:{
                processHelperName: function(filename) {
                    return JSON.stringify(path.basename(filename, '.js'));
                },
                functionContents: function(filename) {
                    return fs.readFileSync(filename);
                }
            }
        }));

    return function () {
        return merge(template, partials, helpers)
            .pipe(concat('templates.js'))
            .pipe(dest('dist/js/'))
            .pipe(dest(serverProjectPath + '/wwwroot/js'));
    }
};

//meer weten over 'declare': https://github.com/lazd/gulp-handlebars/tree/8e97f01db9edac7068a6402b45f47203841ca705/examples/namespaceByDirectory

exports.templates = templates;