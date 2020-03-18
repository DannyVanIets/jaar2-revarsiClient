module.exports = {
    voornaam:"Danny",
    localServerProjectPath:"../ReversiRestApi/ReversiRestApi",
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
    ]
};