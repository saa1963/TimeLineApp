/// <binding ProjectOpened='watch' />
"use strict";

const { series } = require('gulp');
var gulp = require("gulp");
var fs = require("fs");
const webpack = require('webpack-stream');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
const { watch } = require('gulp');

var paths = {
  webroot: "./wwwroot/"
};

paths.js = "src/js";
paths.minJs = "src/js/*.min.js";
paths.css = [
  paths.webroot + "css/*.css"
];
paths.concatCss = "css/main.css";
paths.distFiles = paths.webroot + "dist/*.*";
paths.dist = paths.webroot + "dist";
paths.popper = "./node_modules/@types/bootstrap/index.d.ts";

function replace_popper(cb) {
  let src = 'import * as Popper from "popper.js";';
  let dst = 'import * as Popper from "popper.js/index.d";';
  fs.readFile(paths.popper, "utf8", function (err, data) {
    if (!err) {
      if (data.indexOf(src) >= 0) {
        data = data.replace(src, dst);
        fs.writeFile(paths.popper, data, err => { });
      }
    }
  });
  cb();
}

function ts_compileDev(cb) {
  return gulp.src('src/*.ts')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(paths.webroot + 'dist/'));
}

function compile_sass(cb) {
  let options = {
    includePaths: ['./scss/fontawesome', './scss/bootstrap']
  };
  return gulp.src('./scss/**/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(options).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.webroot + 'dist'));
}

function Init_watch(cb) {
    watch([paths.webroot + 'src/*.ts'], ts_compileDev);
    cb();
}

//exports.default = series(compile_sass, ts_compileDev);
exports.watch = Init_watch;
exports.ts_compileDev = ts_compileDev;
exports.compile_sass = compile_sass;
exports.replace_popper = replace_popper;
