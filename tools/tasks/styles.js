const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const csscomb = require('gulp-csscomb');

const config = require('./../config');

const files = path.join(config.paths.source, '**/*.{scss,css}');
const autoprefixerOptions = {
	browsers: ['> 1%', 'IE 7'],
};

gulp.task('_csscomb', () => {
	return gulp.src([files, '!**/_mixins.scss'])
		.pipe(csscomb(path.join(config.paths.root, '.csscomb.json')))
		.on('error', (err) => {
			gutil.log(gutil.colors.red('[csscomb]'), err);
		})
		.pipe(gulp.dest(path.join(config.paths.source)));
});

gulp.task('_styles', () => {
	return gulp.src(files)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.paths.build))
		.pipe(connect.reload());
});

gulp.task('_styles:dist', () => {
	return gulp.src(files)
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(cssnano())
		.pipe(gulp.dest(config.paths.tmp));
});

gulp.task('_styles:watch', () => {
	return gulp.watch(files, ['_csscomb', '_styles']);
});
