const htmlmin = require('gulp-htmlmin');
var rename = require("gulp-rename");

const {src, dest} = require('gulp');

const fn = function() {
    return function () {
        return src(['index.html'])
            .pipe(htmlmin({
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                removeComments: true
            }))
            .pipe(rename(function (path) {
                path.dirname += "/";
                path.basename = 'index';
                path.extname = ".html";
            }))
            .pipe(dest("./dist"));
    }
};

exports.html = fn;