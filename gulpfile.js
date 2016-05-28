//node modules
const fs = require('fs');
const path = require('path');

//gulp modules
const gulp = require('gulp');
const gutil = require('gulp-util');
const revReplace = require('gulp-rev-replace');

//project files
const config = require('./tools/config');

//load all our utility gulp tasks
fs.readdirSync(config.paths.tasks).map((fileName) => {
	return require(path.join(config.paths.tasks, fileName)); //eslint-disable-line global-require
});

//primary tasks
gulp.task('serve', [
	'_clean:build',
	'_images',
	'_styles',
	'_html',
	'_server',
	'_images:watch',
	'_styles:watch',
	'_html:watch',
]);

gulp.task('dist', [
	'_clean',
	'_rev',
	'_html:dist',
], () => {
	const manifest = gulp.src(path.join(config.paths.tmp, 'rev-manifest.json'));

	return gulp.src(path.join(config.paths.dist, '/index.html'))
		.pipe(revReplace({ manifest }))
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('default', ['serve']);
