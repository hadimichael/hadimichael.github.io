const path = require('path');
const gulp = require('gulp');
const rev = require('gulp-rev');
const config = require('./../config');

gulp.task('_rev', () => {
	return gulp.src(path.join(config.paths.tmp, '**/*.{css,png}'))
		.pipe(rev())
		.pipe(gulp.dest(config.paths.dist))
		.pipe(rev.manifest())
		.pipe(gulp.dest(config.paths.tmp));
});
