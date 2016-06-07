const gulp = require('gulp');
const ghpages = require('gh-pages');
const gutil = require('gulp-util');

const config = require('./../config');

const appRepoDeploymentOptions = {
	landing: {
		branch: 'master', //use default remoteUrl, which is the current repo
	},
	notes: {
		remoteUrl: 'https://github.com/hadimichael/notes.git', //use default branch, which is gh-pages
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

gulp.task('deploy', ['dist'], () => {
	return ghpages.publish(config.paths.dist, ghPagesOptions, (err) => {
		if (!!err) {
			gutil.log(gutil.colors.red('[deploy] Error deploying'), err);
		}
	});
});
