const {src, dest} = require('gulp');

const fn = function(backendPath) {
    return function () {
        return src("js/*.js")
            .pipe(dest("dist")).pipe(dest(backendPath));
    }
};

exports.js = fn;