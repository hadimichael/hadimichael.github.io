const gulp = require('gulp');
const ghpages = require('gh-pages');
const gutil = require('gulp-util');

const config = require('./../config');

gulp.task('deploy', ['dist'], () => {
	return ghpages.publish(config.paths.dist, {
		message: `Build and deploy on ${new Date()}`,
		branch: 'master',
		logger: (message) => {
			gutil.log(gutil.colors.blue('[deploy]'), message);
		},
	}, (err) => {
		if (!!err) {
			gutil.log(gutil.colors.red('[deploy] Error deploying'), err);
		}
	});
});
