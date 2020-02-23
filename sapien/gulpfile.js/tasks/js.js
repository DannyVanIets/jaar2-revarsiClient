var order = require("gulp-order");
const babel = require('gulp-babel');
var concat = require('gulp-concat');

const {src, dest} = require('gulp');

const fn = function(filesJs, filesJsOrder, backendPath) {
    return function () {
        return src(filesJs)
            .pipe(order(filesJsOrder, {base :"./"}))
            .pipe(concat("app.js"))
            .pipe(babel({
                presets: ["@babel/env"]
            }))
            .pipe(dest("./dist/js"))
            .pipe(dest(backendPath));
    }
};

exports.js = fn;