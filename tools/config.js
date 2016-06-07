const path = require('path');

//Project paths
exports.paths = {
	root: path.join(__dirname, '../'),
	tools: path.join(__dirname),
	tasks: path.join(__dirname, './tasks'),
	assets: path.join(__dirname, '../assets'),
	source: path.join(__dirname, '../source'),
	tmp: path.join(__dirname, '../.tmp'),
	devbuild: path.join(__dirname, '../.devbuild'),
	dist: path.join(__dirname, '../.dist'),
};

//rev-manifest filenames
exports.rev = {
	images: 'images.rev-manifest.json',
	styles: 'styles.rev-manifest.json',
};
