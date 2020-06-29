module.exports = {
    voornaam:"Danny",
    localServerProjectPath:"../../ReversiServer/ReversiApp/wwwroot/dist/",
    localFilesJs:"js/**/*.js",
    localFilesJsOrder:["js/*.js", "js/game/*.js"],
    sass: [
        'css/*.scss',
        'features/**/*.scss',
    ],
    vendorFiles: [
        'vendor/**/*.js',
    ],
    templatesFiles: [
        'templates/**/[^_]*.hbs',
    ],
    partialFiles: [
        'templates/**/_*.hbs',
    ],
    helperFiles: [
        'templates/helpers/*.js',
    ]
};