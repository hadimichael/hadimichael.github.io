//node modules
const fs = require('fs');
const path = require('path');

//gulp modules
const gulp = require('gulp');

//project files
const config = require('./tools/config');

//load all our gulp tasks
fs.readdirSync(config.paths.tasks).map((fileName) => {
	return require(path.join(config.paths.tasks, fileName)); //eslint-disable-line global-require
});

//first-level tasks
const clean = exports.clean = gulp.parallel('_clean:assets', '_clean:tmp', '_clean:build', '_clean:dist');

const buildDev = exports['build:dev'] = gulp.series(
	clean,
	'_favicons',
	'_csscomb',
	gulp.parallel('_images', '_styles', '_html'),
	'_assets'
);

const serve = exports.serve = gulp.series(
	buildDev,
	gulp.parallel('_images:watch', '_styles:watch', '_html:watch', '_assets:watch', '_server'),
);

const buildDist = exports['build:dist'] = gulp.series(
	clean,
	gulp.parallel('_images:dist', '_styles:dist', '_favicons'), 
	'_rev',
	'_html:dist',
	'_assets:dist',
	'_rev:dist'
);

const publish = exports.publish = gulp.series(buildDist, 'deploy');

exports.default = serve;