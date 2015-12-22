// 웹서버를 localhost:8000 로 실행한다.
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var minify = require('gulp-minify');
var webpack = require('gulp-webpack');
var minifyhtml = require('gulp-minify-html');
var livereload = require('gulp-livereload');

var src = './public/src';
var dist = './public/dist';

var paths = {
  js : src + '/js/*.js',
  html : src + '/**/*.html'
};

var webpackSetting = {
  devtool : 'source-map',
  output : {
    filename : 'script.js'
  },
  module : {
    loaders : [
      test : /.js?$/,
      exclude : /node_modules/,
      loader : 'babel-loader',
      query : {
        presets : ['es2015', 'react']
      }
    ],
  }
};


gulp.task('server', function () {
	return gulp.src(dist + '/')
		.pipe(webserver());
});

// 자바스크립트 파일을 하나로 합치고 압축한다.
/*gulp.task('combine-js', function () {
	return gulp.src(paths.js)
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dist + '/js'));
});*/

// sass 파일을 css 로 컴파일한다.
/*gulp.task('compile-sass', function () {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(dist + '/css'));
});*/

gulp.task('combine-js', function() {
  return gulp.src(paths.js)
             .pipe(webpack(webpackSetting))
             //.pipe(minify())
             .pipe(gulp.dest(dist + '/js'));
});

// HTML 파일을 압축한다.
gulp.task('compress-html', function () {
	return gulp.src(paths.html)
		.pipe(minifyhtml())
		.pipe(gulp.dest(dist + '/'));
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(paths.js, ['combine-js']);
	//gulp.watch(paths.scss, ['compile-sass']);
	gulp.watch(paths.html, ['compress-html']);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});

//기본 task 설정
gulp.task('default', [
	'server', 'combine-js', 'compress-html', 
	'watch' ]);
