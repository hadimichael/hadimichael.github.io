const path = require('path');

//Project paths
exports.paths = {
	root: path.join(__dirname, '../'),
	config: path.join(__dirname),
	tasks: path.join(__dirname, './tasks'),
	assets: path.join(__dirname, '../assets'),
	source: path.join(__dirname, '../source'),
	tmp: path.join(__dirname, '../.tmp'),
	build: path.join(__dirname, '../.build'),
	dist: path.join(__dirname, '../.dist'),
};

//rev-manifest filenames
exports.rev = {
	images: 'images.rev-manifest.json',
	styles: 'styles.rev-manifest.json',
};
