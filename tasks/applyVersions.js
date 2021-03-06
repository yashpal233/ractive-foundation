var through = require('through2');
var path = require('path');
var fs = require('fs');
var pkg = require('../package.json');
var gutil = require('gulp-util');

module.exports = function () {

	var processable = [];
	var commentHeader = fs.readFileSync('./tasks/commentHeader.txt', 'utf8');

	var collect = function(file, enc, callback) {
		processable.push(file);
		callback(null, file);
	};

	var run = function(callback) {
		processable.forEach(function (file) {
			var contents = fs.readFileSync(file.path, 'utf8');
			var template = gutil.template(commentHeader, { file : file, pkg: pkg });

			fs.writeFileSync(file.path, template + contents);
			this.push(file);
		}.bind(this));

		callback();
	};


	return through.obj(collect, run);

};
