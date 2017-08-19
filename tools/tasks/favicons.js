const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const realFavicon = require('gulp-real-favicon');

const config = require('./../config');

const masterPicture = path.join(config.paths.images, 'hadi-icon.png');

gulp.task('_favicons', (done) => {
	realFavicon.generateFavicon({
		masterPicture,
		dest: config.paths.assets,
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'noChange',
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#fafafa',
				onConflict: 'override',
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#fafafa',
				manifest: {
					name: 'Hadi Michel',
					display: 'browser',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true,
				},
			},
			safariPinnedTab: {
				pictureAspect: 'blackAndWhite',
				threshold: 50,
				themeColor: '#fafafa',
			},
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
		},
		markupFile: config.FAVICON_DATA_FILE,
	}, () => {
		done();
	});
});

gulp.task('_check-for-favicon-update', (done) => {
	const currentVersion = JSON.parse(fs.readFileSync(config.FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, (err) => {
		if (err) {
			throw err;
		}
		done();
	});
});
