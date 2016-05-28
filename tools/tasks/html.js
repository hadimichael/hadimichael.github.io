const path = require('path');
const gulp = require('gulp');
const connect = require('gulp-connect');
const htmlmin = require('gulp-htmlmin');

const config = require('./../config');

const files = path.join(config.paths.source, '**/*.html');
const htmlminOptions = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	removeAttributeQuotes: true,
	removeCommentsFromCDATA: true,
	removeEmptyAttributes: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	useShortDoctype: true,
};

gulp.task('_html', () => {
	return gulp.src(files)
		.pipe(htmlmin())
		.pipe(gulp.dest(config.paths.build))
		.pipe(connect.reload());
});

gulp.task('_html:dist', () => {
	return gulp.src(files)
		.pipe(htmlmin(htmlminOptions))
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('_html:watch', () => {
	return gulp.watch(files, ['_html']);
});
