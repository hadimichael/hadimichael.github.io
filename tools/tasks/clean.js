const gulp = require('gulp');
const del = require('del');

const config = require('./../config');

gulp.task('_clean:tmp', () => {
	return del.sync(config.paths.tmp);
});

gulp.task('_clean:build', () => {
	return del.sync(config.paths.devbuild);
});

gulp.task('_clean:dist', () => {
	return del.sync(config.paths.dist);
});
