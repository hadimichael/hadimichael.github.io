//node modules
const fs = require('fs');
const path = require('path');

//gulp modules
const gulp = require('gulp');
const revReplace = require('gulp-rev-replace');

//project files
const config = require('./tools/config');

//load all our utility gulp tasks
fs.readdirSync(config.paths.tasks).map((fileName) => {
	return require(path.join(config.paths.tasks, fileName)); //eslint-disable-line global-require
});

//primary tasks
gulp.task('clean', ['_clean:tmp', '_clean:build', '_clean:dist']);

gulp.task('serve', [
	'_clean:build',
	'_images',
	'_styles',
	'_html',
	'_assets',
	'_server',
	'_images:watch',
	'_styles:watch',
	'_html:watch',
	'_assets:watch',
]);

gulp.task('dist', [
	'_clean:dist',
	'_rev',
	'_html:dist',
	'_assets:dist',
], () => {
	const manifest = gulp.src(path.join(config.paths.tmp, 'rev-manifest.json'));

	return gulp.src(path.join(config.paths.dist, '/index.html'))
		.pipe(revReplace({ manifest }))
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('default', ['serve']);
