'use strict';

// Plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const clean_css = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

// API
const path = require('path');

// Variables
const defaults = [ 'scss', 'html' ];
const css_all = 'all.min.css';
const build_dir = path.join(__dirname, 'build');
const watches = [
	{ path: 'src/*.scss', task: ['scss'] },
	{ path: 'html/*.pug', task: ['html'] }
];

// Tasks handlers
function task_SCSS() {
	return gulp.src('src/main.scss')
		.pipe(sass())
		.pipe(concat(css_all))
		.pipe(clean_css({compatibility: 'ie8'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(build_dir));
}

function task_HTML() {
	return gulp.src('html/*.pug')
		.pipe(pug())
		.pipe(gulp.dest(build_dir));
}

// Tasks
gulp.task('scss', task_SCSS);
gulp.task('html', task_HTML);
gulp.task('default', defaults);
gulp.task('watch', function() {
	for(var i = 0; i < watches.length; i++) {
		gulp.watch(watches[i].path, watches[i].task);
	}
});
