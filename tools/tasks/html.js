const path = require('path');
const gulp = require('gulp');
const connect = require('gulp-connect');
const htmlmin = require('gulp-htmlmin');
const realFavicon = require('gulp-real-favicon');
const fs = require('fs');

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
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(config.FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(htmlmin())
		.pipe(gulp.dest(config.paths.devbuild))
		.pipe(connect.reload());
});

gulp.task('_html:dist', () => {
	return gulp.src(files)
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(config.FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(htmlmin(htmlminOptions))
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('_html:watch', () => {
	return gulp.watch(files, ['_html']);
});
