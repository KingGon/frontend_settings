#GitHub ����ϱ�
Git ��ġ : https://git-scm.com

###���� �۾� ���� git ����
"'
git init
"'

###git ����
"'
git config --global user.email js68.kim@gmail.com
git config --global user.name KingGon
"'
###git �ø���
git commit -m "first commit"
git remote add origin �ּ�
git push -u origin master


###GitHub ����
+ Github ����
+ Github New Repository
+ �ּ� ����


#git ��������
git���� �ּҺ���
git clone �ּ�

###npm ����
npm install �ÿ� --save-dev��� �ϴ� ����?
--save-dev �÷��׸� ����ϸ� devDependency�� ��ġ�ȴ�. ���ߴܰ迡���� �ʿ��� ���
--save-dev �ɼ��� �־�� �Ѵ�. ���ø����̼ǿ� ���࿡ �ʿ��� ��� --save �÷��׸� �ش�.

"'
npm init
npm install webpack --global
npm install webpack --save-dev
"'

### webpack ����
webpack.config.js
module.exports = {
  context: __dirname + "/app",
  entry: "./app.js",

  output: {
    filename: "app.js",
    path: __dirname + "/dist",
  },
}


babel-loader ��ġ
npm install babel-loader --save-dev

gulp ��ġ
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

// �������� localhost:8000 �� �����Ѵ�.
gulp.task('server', function () {
	return gulp.src(dist + '/')
		.pipe(webserver());
});

// �ڹٽ�ũ��Ʈ ������ �ϳ��� ��ġ�� �����Ѵ�.
gulp.task('combine-js', function () {
	return gulp.src(paths.js)
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dist + '/js'));
});

// sass ������ css �� �������Ѵ�.
gulp.task('compile-sass', function () {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(dist + '/css'));
});

// HTML ������ �����Ѵ�.
gulp.task('compress-html', function () {
	return gulp.src(paths.html)
		.pipe(minifyhtml())
		.pipe(gulp.dest(dist + '/'));
});

// ���� ���� ���� �� ������ �����
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(paths.js, ['combine-js']);
	gulp.watch(paths.scss, ['compile-sass']);
	gulp.watch(paths.html, ['compress-html']);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});

//�⺻ task ����
gulp.task('default', [
	'server', 'combine-js', 
	'compile-sass', 'compress-html', 
	'watch' ]);