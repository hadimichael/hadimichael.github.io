const gulp = require('gulp');
const connect = require('gulp-connect');

const config = require('./../config');

gulp.task('_server', () => {
	return connect.server({
		root: config.paths.build,
		livereload: true,
	});
});
