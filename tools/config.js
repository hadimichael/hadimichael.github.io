const path = require('path');
const fs = require('fs');

const source = path.join(__dirname, `../source/${process.env.APP}`);

fs.access(source, fs.F_OK, (err) => {
	if (!!err) {
		throw new Error(`Expected a valid APP environment variable, got: ${process.env.APP}`);
	}
});

exports.isLanding = process.env.APP === 'landing';

//Project paths
exports.paths = {
	root: path.join(__dirname, '../'),
	tools: path.join(__dirname),
	tasks: path.join(__dirname, './tasks'),
	assets: path.join(__dirname, '../assets'),
	tmp: path.join(__dirname, '../.tmp'),
	devbuild: path.join(__dirname, '../.devbuild'),
	dist: path.join(__dirname, '../.dist'),
	source,
};

//rev-manifest filenames
exports.rev = {
	images: 'images.rev-manifest.json',
	styles: 'styles.rev-manifest.json',
};
