"use strict";


var Confidence = require('confidence');
var store = new Confidence.Store();
var through = require('through2');
var gutil = require('gulp-util');
var _ = require('lodash');


module.exports = function gulpConfidence(data, options) {
	return through.obj(function(file, enc, cb) {
		options = options || {};
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-confidence', 'Streaming not supported'));
			return;
		}

		if (file.data) {
			data = _.extend(file.data, data);
		}

		try {
			var configurationObject;
			if (file.contents.toString()) {
				store.load(JSON.parse(file.contents.toString()));
				configurationObject = JSON.stringify(store.get(options.key || "/", data));
				if (!configurationObject) {
					throw new Error("Didn't find any values in the dictionary that matched key " + options.key);
				}
			}
			file.contents = new Buffer(configurationObject || "");
			this.push(file);

		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-confidence', err, {
				fileName: file.path
			}));
		}

		cb();
	});
};