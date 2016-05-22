##Gulp 설정하기
Gulp는 빌드 자동화툴이다. 
---
###gulp 주요 기능
+ file minification
+ Server side ES6 사용
+ 프론트엔드 사이드의 파일이 변경 될 시 브라우저 새로고침
+ webpack을 사용하여 프론트엔드에서 ES6 사용, import 사용
  (webpack은 module bundler로서 프론트엔드 사이드에서 js 로드를 도와준다)
### 설치하기
1. Gulp 전역(Global) 설치
```sh
$ sudo npm install -g gulp
```

### Gulp 주요 API(자세한 내용은 gulp api[https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options])
1. gulp.task
2. gulp.src
3. gulp.dest
4. gulp.watch

#### gulp.task(name [, deps, fn])
작업을 정의한다.
deps는 배열 형태를 가지며 이 배열안의 task를 먼저 실행한 다음 fn을 실행한다.

```
gulp.task('hello', () => {
    console.log('hello');
});

gulp.task('world', ['hello'], () => {
    console.log('world');
});
```
gulp task는 gulp name으로 수행한다.

```sh
$ gulp world
```

#### gulp.src(globs [, options])
어떤 파일을 읽을지 설정한다.
globs는 string, array형태이다. "**/*.js" 형태로 여러파일을 한번에 지정할 수 있다.
`!`을 사용하면 결과를 제외할 수 있다. 아래 예제를 참고.
```
clinet
   └── a.js
   └── bob.js
   └── bad.js
``` 
`a.js`와 `bad.js`만 선택되게 설정한다.
```
gulp.src(['client/*.js', '!client/b*.js', 'client/bad.js']);
```
이 객체가 리턴한 객체는 `.pipe`을 통하여 다른 플러그인을 사용해 변환 가능하다.

#### gulp.dest(path[, options])
어디에 저장할지 지정한다.
path는 디렉토리, options는 객체로서 {cwd:__, mode:___}형태이다.
(current working directory, mode는 권한)

#### gulp.watch(glob, [, options], tasks/callback)
glob에 해당하는 파일들을 주시하다 변경이 있을 경우  task를 실행한다.

```js
var watcher = gulp.watch('js/**/*.js', ['uglify', 'reload']);
watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// OR 

gulp.watch('js/**/*.js', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```

-------------------
### gulpfile 작성하기
#### 플러그인 설치
    + gulp-uglify
    + gulp-clean-css (minify css)
    + gulp-htmlmin
    + gulp-imagemin
    + del (플러그인은 아니지만 사용할 수 있다. 특정 디렉토리 삭제)
 
 ```sh
 $ npm install --save-dev gulp-uglify gulp-clean-css gulp-htmlmin gulp-imagemin del
 ```
 
 gulpfile.js를 생성하고 상단에 plugin을 import 한다.
 ```js
 import uglify from 'gulp-uglify';
 import cleanCSS from 'gulp-clean-css';
 import htmlmin from 'gulp-htmlmin';
 import imagemin from 'gulp-imagemin';
 import del from 'del';
 ```
 
 #### 디렉토리 정의
 ```js
const DIR = {
    SRC : 'src',
    DEST : 'dist' 
};

const SRC = {
    JS : DIR.SRC + '/js/*.js',
    CSS : DIR.SRC + '/css/*.css',
    HTML : DIR.SRC + '/*.html',
    IMAGES : DIR.SRC + '/images/*'
};

const DEST = {
    JS : DIR.DEST + '/js',
    CSS : DIR.DEST + '/css',
    HTML : DIR.DEST + '/',
    IMAGES : DIR.DEST + '/images'
};
 ```
 
 #### TASK 작성
 
 
 ```js
 //minify javascript
 gulp.task('js', () => {
     return gulp.src(SRC.JS)
            .pipe(uglify())
            .pipe(gulp.dest(DEST.JS));
 });
 
 //minify html
 gulp.task('html', () => {
     return gulp.src(SRC.HTML)
                .pipe(htmlmin())
                .pipe(gulp.dest(DEST.HTML);
 });    
 
 //minify css
 gulp.task('css', () => {
    return gulp.src(SRC.CSS)
                .pipe(cleanCSS())
                .pipe(gulp.dest(DEST.CSS));
});

//compress images
gulp.task('images', () => {
    return gulp.src(SRC.IMAGES)
                .pipe(imagemin())
                .pipe(gulp.desk(DEST.IMAGES));
});

//clean
gulp.task('clean', () => {
    return del.sync([DIR.DESK]);
});


//watch
gulp.task('watch', () => {
    gulp.watch(SRC.JS, ['js']);
    gulp.watch(SRC.CSS, ['css']);
    gulp.watch(SRC.HTML, ['html']);
    gulp.watch(SRC.IMAGES, ['images']);
});

//default
gulp.task('default', ['clean', 'js', 'css', 'html', 'images', 'watch'], () => {
   console.log('Gulp is running');
});


 ```
어떤 파일이 변경되었는지 기록하고싶으면 gulp-util을 사용한다
```sh
$ npm install --save-dev gulp-util
```

watch에 파일의 변경을 기록하려면 아래와 같이 수정한다.
```js
gulp.task('watch', () => {
    let watcher = {
        js : gulp.watch(SRC.JS, ['js']),
        css : gulp.watch(SRC.CSS, ['css']),
        html : gulp.watch(SRC.HTML, ['html']),
        images : gulp.watch(SRC.IMAGES, ['images'])
    };
    
    let callback = (event) => {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    }
    
    for(let key in watcher) {
        watcher[key].on('change', callback);
    }
});
``` 

#### gulp 실행
```sh
$ gulp
``` 
 