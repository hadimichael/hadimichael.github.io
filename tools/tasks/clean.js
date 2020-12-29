const gulp = require('gulp');
const del = require('del');

const config = require('./../config');

gulp.task('_clean:assets', (done) => {
	del.sync(config.paths.assets);
	done();
});

gulp.task('_clean:tmp', (done) => {
	del.sync(config.paths.tmp);
	done();
});

gulp.task('_clean:build', (done) => {
	del.sync(config.paths.devbuild);
	done();
});

gulp.task('_clean:dist', (done) => {
	del.sync(config.paths.dist);
	done();
});
