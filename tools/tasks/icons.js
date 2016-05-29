'use strict';

const path = require('path');
const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const DirectoryColorfy = require('directory-colorfy');
const DirectoryEncoder = require('directory-encoder');
const imagemin = require('gulp-imagemin');
const raster = require('gulp-raster');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');

const config = require('./../config');

const iconSelectors = path.join(config.paths.tools, '/selectors.config.js');
const customSelectors = require(iconSelectors);
const pngPath = '/images/icons/png';

function generateIconPaths(root) {
	const iconPathsRoot = root || config.paths.build;
	return {
		src: path.join(config.paths.source, 'images/icons/*.svg'),
		min: path.join(config.paths.tmp, '_svg-min'),
		colorfy: path.join(config.paths.tmp, '_svg-colorfy'),
		png: path.join(iconPathsRoot, pngPath),
		destSvg: path.join(iconPathsRoot, 'styles/icons.data.svg.css'),
		destPng: path.join(iconPathsRoot, 'styles/icons.data.png.css'),
		destFallback: path.join(iconPathsRoot, 'styles/icons.fallback.css'),
	};
}

let iconPaths = generateIconPaths();

gulp.task('_icons:dist', (callback) => {
	iconPaths = generateIconPaths(config.paths.tmp);
	runSequence('_icons', callback);
});

gulp.task('_icons', (done) => {
	gulp.src(iconPaths.src)
		.pipe(svgmin())
		.pipe(gulp.dest(iconPaths.min))
		.on('finish', () => { //I wish we didn't have to do this and could keep piping...
			//colorfy - https://github.com/filamentgroup/directory-colorfy
			const dc = new DirectoryColorfy(iconPaths.min, iconPaths.colorfy,
				{
					dynamicColorOnly: true,
					colors: {
						white: '#ffffff',
						twitter: '#46c0fb',
						instagram: '#3f729b',
						wordpress: '#464646',
						linkedin: '#0083a8',
						github: '#171515',
						stackoverflow: '#f18436',
					},
				}
			);

			dc.convert().then(() => {
				//encode - https://github.com/filamentgroup/directory-encoder

				const deOptions = {
					customselectors: customSelectors,
					prefix: '.icon-',
					templatePrepend: `/* AUTO-GENERATED on ${new Date()}*/\n/* Source at tools/icons */\n\n`,
					template: path.join(config.paths.tools, 'svgs.css.hbs'),
				};

				//Generate svg-data stylesheet
				const deSvg = new DirectoryEncoder(iconPaths.colorfy, iconPaths.destSvg, deOptions);
				deSvg.encode();

				gulp.src(path.join(iconPaths.colorfy, '*.svg'))
					.pipe(raster())
					.pipe(rename({ extname: '.png' }))
					.pipe(imagemin())
					.pipe(gulp.dest(iconPaths.png))
					.on('finish', () => {
						//Generate png-data stylesheet
						const dePngOptions = Object.assign({}, deOptions, {
							pngfolder: iconPaths.png,
						});
						const dePng = new DirectoryEncoder(iconPaths.png, iconPaths.destPng, dePngOptions);
						dePng.encode();

						//Generate png fallback stylesheet
						const deFallbackOptions = Object.assign({}, dePngOptions, {
							noencodepng: true,
							pngpath: pngPath,
						});
						const deFallback = new DirectoryEncoder(iconPaths.png, iconPaths.destFallback, deFallbackOptions);
						deFallback.encode();

						done();
					});
			});
		});
});
