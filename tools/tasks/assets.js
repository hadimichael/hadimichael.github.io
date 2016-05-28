const path = require('path');
const gulp = require('gulp');
const connect = require('gulp-connect');

const config = require('./../config');

const files = path.join(config.paths.assets, '**/*');

gulp.task('_assets', () => {
	return gulp.src(files)
		.pipe(gulp.dest(config.paths.build))
		.pipe(connect.reload());
});

gulp.task('_assets:dist', () => {
	return gulp.src(files)
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('_assets:watch', () => {
	return gulp.watch(files, ['_assets']);
});
