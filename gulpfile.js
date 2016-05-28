const path = require('path'); //https://nodejs.org/api/path.html
const gulp = require('gulp'); //https://github.com/gulpjs/gulp
const gutil = require('gulp-util'); //https://github.com/gulpjs/gulp-util
const del = require('del'); //https://github.com/sindresorhus/del
const ghpages = require('gh-pages'); //https://github.com/tschaub/gh-pages

const conf = require('./tools/conf');
const packageDotJson = require('./package.json');

gulp.task('clean', () => {
	return del([conf.paths.dist]);
});

gulp.task('build', ['clean'], () => {
	return gulp.src(path.join(conf.paths.source, '/**/*'))
		.pipe(gulp.dest(conf.paths.dist));
});

gulp.task('deploy', ['build'], () => {
	return ghpages.publish(conf.paths.dist, {
		message: `Deployed update at ${new Date()}`,
		branch: 'master',
		repo: packageDotJson.repository.url,
		logger: (message) => {
			gutil.log(gutil.colors.blue('[deploy]'), message);
		},
	}, (err) => {
		gutil.log(gutil.colors.red('[deploy] Error deploying'), err);
	});
});

gulp.task('default', () => {
	gutil.log(gutil.colors.yellow('[gulp]'), 'No default gulp task');
});
