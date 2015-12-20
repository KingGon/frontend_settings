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
/*gulp.task('compile-sass', function () {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(dist + '/css'));
});*/

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