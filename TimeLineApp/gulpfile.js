/// <binding BeforeBuild='min' Clean='clean' />
"use strict";

const { series } = require('gulp');
var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  terser = require("gulp-terser"),
  ts = require("gulp-typescript"),
  tsProject = ts.createProject("tsconfig.json");

var paths = {
  webroot: "./wwwroot/"
};

paths.js = "src/js/*.js";
paths.minJs = "src/js/*.min.js";
paths.css = [
  paths.webroot + "css/*.css",
  paths.webroot + "lib/fontawesome-free-5.5.0-web/css/all.min.css",
  paths.webroot + "lib/bootstrap/css/bootstrap.min.css"
];
paths.concatCss = "css/main.css";
paths.distCssFiles = paths.webroot + "dist/*.css";
paths.distJsFiles = paths.webroot + "dist/main.js";
paths.dist = paths.webroot + "dist";

function clean(cb) {
  rimraf(paths.distCssFiles, cb);
  rimraf(paths.distJsFiles, cb);
}

function min_js(cb) {
  return gulp.src([paths.js])
    .pipe(concat("main.min.js"))
    .pipe(terser())
    .pipe(gulp.dest(paths.dist));
}

function min_css(cb) {
  return gulp.src(paths.css)
    .pipe(concat("main.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest(paths.dist));
}

function min_css1(cb) {
  return gulp.src(paths.css)
    .pipe(concat("main.css"))
    .pipe(gulp.dest(paths.dist));
}

function ts_compileDev(cb) {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(concat("main.js"))
    .pipe(gulp.dest(paths.dist));
}

function ts_compileProd(cb) {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(concat("main.min.js"))
    .pipe(terser())
    .pipe(gulp.dest(paths.dist));
}

exports.Production = series(clean, min_css, ts_compileProd);
exports.Development = series(clean, min_css1, ts_compileDev);
