const gulp = require('gulp');
const ghpages = require('gh-pages');
const gutil = require('gulp-util');

const config = require('./../config');

const appRepoDeploymentOptions = {
	landing: {
		branch: 'master', //use default remote (=origin), which is the current repo
	},
	notes: {
		repo: 'https://github.com/hdmchl/notes.git', //use default branch, which is gh-pages
	},
};

if (!appRepoDeploymentOptions[process.env.APP]) {
	gutil.log(gutil.colors.red('[deploy] Unknown APP. ' +
		`Expected [${Object.keys(appRepoDeploymentOptions).toString()}], but got ${process.env.APP}`));
	throw new Error(`Expected a valid APP environment variable, got: ${process.env.APP}`);
}

const ghPagesDefaultOptions = {
	message: `Build and deploy on ${new Date()}`,
	logger: (message) => {
		gutil.log(gutil.colors.blue('[deploy]'), message);
	},
};

const ghPagesOptions = Object.assign(
	ghPagesDefaultOptions,
	appRepoDeploymentOptions[process.env.APP]
);

ghpages.clean(); //clean the cache

gulp.task('deploy', () => {
	return ghpages.publish(config.paths.dist, ghPagesOptions, (err) => {
		if (!!err) {
			gutil.log(gutil.colors.red('[deploy] Error deploying'), err);
		}
	});
});
