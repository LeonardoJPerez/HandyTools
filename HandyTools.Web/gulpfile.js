/// <binding AfterBuild='replace' />
var gulp = require("gulp");
var replace = require("gulp-replace-task");
var args = require("yargs").argv;
var fs = require("fs");

gulp.task("replace", function () {
    // Get the environment from the command line
    var env = args.env || "dev";

    // Read the settings from the right file
    var filename = env + ".json";
    var settings = require("./config/" + filename);

    // Replace each placeholder with the correct value for the variable.
    gulp.src("config/constants.js")
      .pipe(replace({
          patterns: [
            {
                match: "APISERVERURL",
                replacement: settings.ApiServerPath
            },
             {
                 match: "CURRENTSERVERURL",
                 replacement: settings.CurrentServer
             }
          ]
      }))
      .pipe(gulp.dest("app/services"));
});