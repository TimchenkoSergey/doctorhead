"use strict";

const gulp       = require("gulp"),
	  minify     = require("gulp-minify-css"),
	  prefix     = require("gulp-autoprefixer"),
	  sass       = require("gulp-sass"),
	  concat     = require("gulp-concat");

gulp.task("css", function() {
	gulp.src([
			"libs/normalize/normalize.css",
			"libs/bootstrap/css/bootstrap.min.css",
			"scss/main.scss"
		])
		.pipe(sass())
		.pipe(concat("main.min.css"))
		.pipe(prefix("last 5 versions","> 1%","ie 9"))
		.pipe(minify())
		.pipe(gulp.dest("scss/"));
});

gulp.task("watch", function() {
	gulp.watch("scss/*.scss", ["css"]);
});

gulp.task("default", ["css"]);