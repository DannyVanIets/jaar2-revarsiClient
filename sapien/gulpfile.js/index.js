const config = require('./config');
const {series, parallel, watch} = require('gulp');
var browserSync = require('browser-sync').create();

const js = require('./tasks/js').js(config.localFilesJs, config.localFilesJsOrder, config.localServerProjectPath);
js.displayName = "js";

const sass = require('./tasks/sass').sass(config.localServerProjectPath, config.sass);
sass.displayName = 'sass';

const html = require('./tasks/html').html();
html.displayName = 'html';

const vendor = require('./tasks/vendor').vendor(config.vendorFiles, config.localServerProjectPath);
vendor.displayName = 'vendor';

const template = require('./tasks/template').template(config.templateFiles);
template.displayName = 'template';

const hello = function (done) {
    console.log(`Groeten van ${config.voornaam}!`);
    done();
};

const css = function (done){
    console.log("Css...");
    done();
};

const watchFiles = () => {
    browserSync.init({server: {baseDir: "./"}});
    //Meerdere keren watch aanroepen mag voor andere taken!

    watch(["./css/*.css"], series(css));

    watch(['./css/*.scss', './features/**/*.scss'], series(sass));

    watch(["./dist/css/*.css"]).on("change", browserSync.reload);
};
watchFiles.displayName = "watch";

exports.default = hello;

exports.sass = sass;

exports.html = html;

exports.js = js;

exports.watch = watchFiles;

exports.vendor = vendor;

exports.template = template;