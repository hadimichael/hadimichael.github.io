const path = require('path');
const gulp = require('gulp');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const config = require('./../config');

gulp.task('_rev', () => {
	return gulp.src(path.join(config.paths.tmp, '**/*.{css,png}'))
		.pipe(rev())
		.pipe(gulp.dest(config.paths.dist))
		.pipe(rev.manifest())
		.pipe(gulp.dest(config.paths.tmp));
});

gulp.task('_rev:dist', () => {
	const manifest = gulp.src(path.join(config.paths.tmp, 'rev-manifest.json'));

	return gulp.src(path.join(config.paths.dist, '**/*'))
		.pipe(revReplace({ manifest }))
		.pipe(gulp.dest(config.paths.dist));
});