/// <binding BeforeBuild='default' />
"use strict";

const { series } = require('gulp');
var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  fs = require("fs");
const webpack = require('webpack-stream');

var paths = {
  webroot: "./wwwroot/"
};

paths.js = "src/js";
paths.minJs = "src/js/*.min.js";
paths.css = [
  paths.webroot + "css/*.css"
];
paths.concatCss = "css/main.css";
paths.distCssFiles = paths.webroot + "dist/*.css";
paths.distJsFiles = paths.webroot + "dist/main.js";
paths.dist = paths.webroot + "dist";
paths.popper = "./node_modules/@types/bootstrap/index.d.ts";

function replace_popper(cb) {
  fs.readFile(paths.popper, "utf8", function (err, data) {
    if (!err) {
      data = data.replace('import * as Popper from "popper.js";', 'import * as Popper from "popper.js/index.d"');
      fs.writeFile(paths.popper, data, err => { });
    }
  });
  cb();
}

function clean(cb) {
  rimraf(paths.distCssFiles, cb);
  rimraf(paths.distJsFiles, cb);
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

exports.default = series(clean, ts_compileDev);
