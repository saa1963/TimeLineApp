/// <binding BeforeBuild='default' />
"use strict";

const { series } = require('gulp');
var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  fs = require("fs");
const webpack = require('webpack-stream');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var sourcemaps = require('gulp-sourcemaps');

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

function clean(cb) {
  rimraf(paths.distFiles, cb);
}

function min_css1(cb) {
  return gulp.src(paths.css)
    .pipe(concat("main.css"))
    .pipe(gulp.dest(paths.dist));
}

function ts_compileDev(cb) {
  return gulp.src('src/*.ts')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(paths.webroot + 'dist/'));
}

function compile_sass(cb) {
  return gulp.src('./scss/**/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.webroot + 'dist'));
}

exports.default = series(replace_popper , compile_sass, ts_compileDev);
