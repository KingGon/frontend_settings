##NodeJS 환경에서 front-end 개발환경 설정
1. nodejs 설치
2. 프로젝트 폴더 생성
3. npm 설정(초기설정, 모듈 설치)
2. git 설정 및 사용

###nodejs 설치
nodejs 설치한다.

### 프로젝트 폴더 구조 생성
### npm 설정
1. 현재 폴더에 npm 초기화(package.json 생성)
```sh
$ npm init
```
package.json을 받은 경우에는 `npm install` 을 수행한다.
```sh
$ npm install
```
2. gulp, webpack 등 각종 모듈 설치
```sh
$ npm install gulp --save-dev
$ npm install webpack --save-dev
...
```
+ npm install 시에 --save-dev사용 하는 이유?
--save-dev 플래그를 사용하면 devDependency로 설치된다. 개발단계에서만 필요한 경우--save-dev 옵션을 주어야 한다. 어플리케이션에 수행에 필요한 경우 --save 플래그를 준다.

### git 사용하기
1. git 설치 : https://git-scm.com
2. git 설정
```sh
git config --global user.email js68.kim@gmail.com
git config --global user.name KingGon
```
3. 현재 디렉토리 git 설정
```sh
$ git init
```
4. github 연결
 1. Github 가입
 2. Github New Repository
 3. 주소 복사
 4. github 연결
```sh
$ git remote add origin 주소
```
5. github에 올리기
```sh
$ git status 
$ git add .
$ git commit -m "add"
$ git push origin master
```

###github에서 가져오기
```sh
$ git clone 주소
$ git pull origin master //서버 변경사항 가져오기
$ git diff 이전hash 현재hash // 변경사항 확인
```
