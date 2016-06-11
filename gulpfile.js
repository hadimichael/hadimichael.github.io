//node modules
const fs = require('fs');
const path = require('path');

//gulp modules
const gulp = require('gulp');
const revReplace = require('gulp-rev-replace');
const runSequence = require('run-sequence');

//project files
const config = require('./tools/config');

//load all our utility gulp tasks
fs.readdirSync(config.paths.tasks).map((fileName) => {
	return require(path.join(config.paths.tasks, fileName)); //eslint-disable-line global-require
});

//primary tasks
gulp.task('clean', ['_clean:assets', '_clean:tmp', '_clean:build', '_clean:dist']);

gulp.task('devbuild', (callback) => {
	runSequence(
		'clean',
		['_icons', '_images', '_styles', '_html'],
		'_assets',
		callback);
});

gulp.task('serve', ['devbuild'], (callback) => {
	runSequence(
		'_server',
		['_images:watch', '_styles:watch', '_html:watch', '_assets:watch'],
		callback);
});

gulp.task('build:dist', (callback) => {
	runSequence(
		'clean',
		['_icons:dist', '_images:dist', '_styles:dist'],
		'_rev',
		'_html:dist',
		'_assets:dist',
		callback);
});

gulp.task('dist', ['build:dist'], () => {
	const manifest = gulp.src(path.join(config.paths.tmp, 'rev-manifest.json'));

	return gulp.src(path.join(config.paths.dist, '**/*'))
		.pipe(revReplace({ manifest }))
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('default', ['serve']);
