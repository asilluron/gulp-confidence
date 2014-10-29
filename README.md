gulp-confidence
===============

Confidence JSON plugin for GulpJS

# [gulp](http://gulpjs.com)-confidence [![Build Status](https://travis-ci.org/asilluron/gulp-confidence.svg?branch=master)](https://travis-ci.org/asilluron/gulp-confidence)

> retreive parameterized [confidence](https://github.com/hapijs/confidence) documents using gulp.


*Issues with the output should be reported on the confidence [issue tracker](https://github.com/hapijs/confidence).*


## Install

```sh
$ npm install --save-dev gulp-confidence
```


## Usage

### `config/base.config.json`

```json
{
	"hello":{
		"$filter": "place"
		"world": "Hello World",
		"$default": "Hello Mars"
	}
}
```

### `gulpfile.js`

```js
var gulp = require('gulp');
var confidence = require('gulp-confidence');

gulp.task('default', function () {
	return gulp.src('config/base.config.json')
		.pipe(confidence({place: "world"}))
		.pipe(gulp.dest('dist'));
});
```

### `dist/base.config.json`
```json
{
	"hello": "Hello World"
}
```


You can alternatively use [gulp-data](https://github.com/colynb/gulp-data) to inject the data:

### `gulpfile.js`
```js
var gulp = require('gulp');
var confidence = require('gulp-confidence');
var data = require('gulp-data');

gulp.task('default', function () {
	return gulp.src('src/greeting.html')
		.pipe(data(function () {
			return {place: "world"};
		}))
		.pipe(confidence())
		.pipe(gulp.dest('dist'));
});
```

### `dist/base.config.json`
```json
{
	"hello": "Hello World"
}
```


## API

See the [Confidence `Store` docs](https://github.com/hapijs/confidence#confidencestore).

### confidence(data, options)

#### data

Type: `Object`

The [criteria](https://github.com/hapijs/confidence#storegetkey-criteria) object used to populate the text.

#### options

Type: `Object`

Currently just supports a "key" key, that allows you to specify the key used in the [`get()` command](https://github.com/hapijs/confidence#storegetkey-criteria)


## Notes

If you use [grunt](http://gruntjs.com) instead of gulp, but want to perform a similar task, use [grunt-confidence](https://github.com/asilluron/grunt-confidence).


## License

MIT

## Contributors
[Jeromy Malige(Kingles)](http://github.com/kingles)

