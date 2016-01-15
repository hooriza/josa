# josa
종성 유무에 따른 적당한 한글 조사 간단히 붙히기

# 사용방법

## 설치
```
bower install https://github.com/hooriza/josa.git
```

## 스크립트 추가
```html
<script src="/path/to/josa.js"></script>
```

## 사용방법
```js
console.log('아무개'.josa('이 ') + '숫가락'.josa('로 ') + '밥'.josa('를 먹었습니다'));
// 결과 : 아무개가 숫가락으로 밥을 먹었습니다.
```
