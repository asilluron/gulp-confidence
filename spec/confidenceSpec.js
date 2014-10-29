'use strict';
var gutil = require('gulp-util');
var data = require('gulp-data');
var confidence = require('../');

describe("gulp plugin: confidence", function() {
	it('should return properly parsed confidence objects when supplied with a criteria object as the first argument', function(cb) {
		var stream = confidence({
			test: "dummy"
		});
		stream.on('end', cb);

		stream.write(new gutil.File({
			contents: new Buffer('{"testKey": { "$filter": "test", "$default": 2, "dummy": 3 }}')
		}));
		stream.end();

		stream.on('data', function(data) {
			expect(data.contents.toString()).toBe('{"testKey":3}');
		});
	});

	it('allows the user to use gulp-data to supply the criteria object', function(cb) {
		var stream = data(function() {
			return {
				test: "dummy"
			};
		});
		stream.on('end', cb);

		stream.pipe(confidence());
		stream.write(new gutil.File({
			contents: new Buffer('{"testKey": { "$filter": "test", "$default": 2, "dummy": 3 }}')
		}));
		stream.end();

		stream.on('data', function(data) {
			expect(data.contents.toString()).toBe('{"testKey":3}');
		});
	});

	it('supports specifying a key option when using gulp-data', function(cb) {
		var options = {
			key: '/testKey'
		};
		var stream = data(function() {
			return {
				test: "dummy"
			};
		});
		stream.on('end', cb);

		stream.pipe(confidence(null, options));
		stream.write(new gutil.File({
			contents: new Buffer('{"testKey": { "$filter": "test", "$default": 2, "dummy": 3 }}')
		}));
		stream.end();

		stream.on('data', function(data) {
			expect(data.contents.toString()).toBe('3');
		});
	});

	it('will not throw an error when there is no data supplied', function(cb) {
		var stream = confidence();
		stream.on('end', cb);

		stream.write(new gutil.File({
			contents: new Buffer('')
		}));
		stream.end();

		stream.on('data', function(data) {
			expect(data.contents.toString()).toEqual('');
		});
	});

});