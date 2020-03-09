var order = require("gulp-order");
const babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');

const {src, dest} = require('gulp');

const fn = function(filesJs, filesJsOrder, backendPath) {
    return function () {
        return src(filesJs)
            .pipe(order(filesJsOrder, {base :"./"}))
            .pipe(concat("app.js"))
            .pipe(babel({
                presets: ["@babel/env"]
            }))
            .pipe(uglify({compress: true}))
            .pipe(dest("./dist/js"))
            .pipe(dest(backendPath));
    }
};

exports.js = fn;