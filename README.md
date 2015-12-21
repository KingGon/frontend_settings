#GitHub 사용하기
Git 설치 : https://git-scm.com

###현재 작업 폴더 git 설정
"'
git init
"'

###git 설정
"'
git config --global user.email js68.kim@gmail.com
git config --global user.name KingGon
"'
###git 올리기
git commit -m "first commit"
git remote add origin 주소
git push -u origin master


###GitHub 가입
+ Github 가입
+ Github New Repository
+ 주소 복사


#git 가져오기
git에서 주소복사
git clone 주소

###npm 설정
npm install 시에 --save-dev사용 하는 이유?
--save-dev 플래그를 사용하면 devDependency로 설치된다. 개발단계에서만 필요한 경우
--save-dev 옵션을 주어야 한다. 어플리케이션에 수행에 필요한 경우 --save 플래그를 준다.

"'
npm init
npm install webpack --global
npm install webpack --save-dev
"'

### webpack 설정
webpack.config.js
'''js
module.exports = {
  context: __dirname + "/app",
  entry: "./app.js",

  output: {
    filename: "app.js",
    path: __dirname + "/dist",
  },
}
'''

babel-loader 설치
npm install babel-loader --save-dev

gulp 설치
npm install gulp --global
npm install gulp --save-dev

gulpfile.js
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var src = 'public/src';
var dist = 'public/dist';

var paths = {
	js: src + '/js/*.js',
	scss: src + '/scss/*.scss',
	html: src + '/**/*.html'
};

// 웹서버를 localhost:8000 로 실행한다.
gulp.task('server', function () {
	return gulp.src(dist + '/')
		.pipe(webserver());
});

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function () {
	return gulp.src(paths.js)
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dist + '/js'));
});

// sass 파일을 css 로 컴파일한다.
gulp.task('compile-sass', function () {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(dist + '/css'));
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
	gulp.watch(paths.scss, ['compile-sass']);
	gulp.watch(paths.html, ['compress-html']);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});

//기본 task 설정
gulp.task('default', [
	'server', 'combine-js', 
	'compile-sass', 'compress-html', 
	'watch' ]);
