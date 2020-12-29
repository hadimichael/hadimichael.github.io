const path = require('path');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

const config = require('./../config');
const files = path.join(config.paths.source, '**/*.{png,gif,jpg,jpeg}');

gulp.task('_images', () => {
	return gulp.src(files)
		.pipe(imagemin())
		.pipe(gulp.dest(config.paths.devbuild));
});

gulp.task('_images:dist', () => {
	return gulp.src(files)
		.pipe(imagemin())
		.pipe(gulp.dest(config.paths.tmp));
});

gulp.task('_images:watch', () => {
	return gulp.watch(files, gulp.parallel('_images'));
});
