'use strict'; //needed to use let

const path = require('path');
const gulp = require('gulp');
const connect = require('gulp-connect');

const config = require('./../config');

let files = path.join(config.paths.assets, '**/*');

if (config.isLanding) {
	files = [files, path.join(config.paths.source, 'CNAME')];
}

gulp.task('_assets', () => {
	return gulp.src(files)
		.pipe(gulp.dest(config.paths.devbuild))
		.pipe(connect.reload());
});

gulp.task('_assets:dist', () => {
	return gulp.src(files)
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('_assets:watch', () => {
	return gulp.watch(files, gulp.parallel('_assets'));
});
